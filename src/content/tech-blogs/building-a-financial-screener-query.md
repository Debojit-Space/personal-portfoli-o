Building a Financial Screener Query Assistant with LlamaIndex, Pinecone, and RAG

### Empowering Intelligent Stock Screening Using AI-Powered Vector Search and Retrieval-Augmented Generation

Motivation
----------

If you’ve ever tried writing complex queries on platforms like Screener.in, you know it can be a challenge—I’m often not sure what ratios or metrics exist, let alone how to express my intention in Screener’s syntax. It’s effort-intensive to dig through the list, match aliases, and craft correct queries every single time.

So I set out to make a Retrieval-Augmented Generation (RAG) engine that would automatically translate my intent into optimized Screener queries, using only what’s really available in their system.

Step 1: Data Preparation—Automating with Comet Assistant
--------------------------------------------------------

First, I needed a comprehensive dataset mapping all available Screener ratios/metrics and their explanations. Manually scraping each metric would be tedious—so I leveraged the **Comet browser assistant**.

What I did:
* Sent Comet to **Screener's custom screen page**
* Instructed it to:
  * Visit each ratio/metric
  * Extract both the name and the official Screener description
  * Save these as a CSV

After some interactive "hand-holding," I ended up with a file containing about **350 ratios and their definitions**.

**Sample of the data (CSV format):**

```
Metric,Description
"Sales","Trailing 12 Months Sales."
"OPM","Operating profit margin based on last 4 quarters."
... ...
```

To further enrich the data, I again used AI to create another column called **aliases** and added appropriate other names to it.

This resulted in the final CSV structure as:

```
Metric,Description,aliases
"Sales","Trailing 12 Months Sales. Other names: Topline, Revenue, Turnover."
"OPM","Operating profit margin based on last 4 quarters. Other names: Operating Margin."
... ...
```

Step 2: Row-to-Line Data Formatting
-----------------------------------

For LLM-based search to work well, I needed each metric + description + aliases as an atomic piece of context.

So, I converted every CSV row into a single line, for example:

The metric "Sales" means Trailing 12 Months Sales. Other names for this metric are: Topline, Revenue, Turnover.

```python
# Load text chunks
with open('data/screener_ratios_text.txt', 'r', encoding='utf-8') as f:
    lines = [line.strip() for line in f if line.strip()]
```

Step 3: Chunks for Embedding (Context = 1 Line)
-----------------------------------------------

To preserve meaning and consistency, **each metric description becomes its own chunk**.
This avoids LLM confusion and ensures vector search never returns irrelevant combinations.

```python
# Prepare llama_index documents
from llama_index.core.schema import TextNode
nodes = [TextNode(text=line, metadata={'source': 'metrics_queries', 'line_id': idx}) for idx, line in enumerate(lines)]
```

Step 4: Embedding & Indexing with Pinecone & LlamaIndex
-------------------------------------------------------

Now: turn each chunk into an embedding, store it in Pinecone, and let LlamaIndex coordinate.

a. Set up models and keys:

```python
from llama_index.embeddings.openai import OpenAIEmbedding
embed_model = OpenAIEmbedding(model="text-embedding-3-small", dimensions=512)
```

b. Set up Pinecone & Chroma:

To create a new index in Pinecone, one can refer 

```python
import pinecone, chromadb
from llama_index.vector_stores.pinecone import PineconeVectorStore
from llama_index.vector_stores.chroma import ChromaVectorStore
pinecone.init(api_key="YOUR_PINECONE_KEY")
pinecone_index = pinecone.Index("screener-metric-index")
vector_store = PineconeVectorStore(pinecone_index=pinecone_index)
chroma_client = chromadb.PersistentClient(path="./chromadb_dir")
chroma_collection = chroma_client.get_or_create_collection("metrics_query")
doc_store = ChromaVectorStore(chroma_collection=chroma_collection)
```

c. Build and store the vector index:

```python
from llama_index.core import VectorStoreIndex, StorageContext
storage_context = StorageContext.from_defaults(vector_store=vector_store, docstore=doc_store)
index = VectorStoreIndex(
    nodes,
    storage_context=storage_context,
    embed_model=embed_model
)
index.storage_context.persist(persist_dir="./llama_persisted")
```

Step 5: RAG Querying with LlamaIndex + LLM (with System Prompt)
--------------------------------------------------------------

Here’s the magic: pass a **system prompt** so the LLM acts as a strict translator, only using real Screener metrics—never making up ratios or using aliases.

```python
from llama_index.llms.openai import OpenAI as LlamaOpenAI
from llama_index.core.settings import Settings
# Setup your LLM (OpenAI example)
llm = LlamaOpenAI(model="gpt-4o-mini",
                  temperature=0.0,
                  api_key=os.environ.get("OPENAI_API_KEY"),
                  system_prompt=my_system_prompt)
Settings.llm = llm
# Create the query engine
query_engine = index.as_query_engine(
    llm=Settings.llm, # Explicitly pass your LLM if you want
    similarity_top_k=5 # Number of chunks to retrieve and send to LLM
)
query1 = "Companies where weekly volumes have increased by more than 5x and price movement is positive."
response = query_engine.query(query1)
print(response)
```

**Output Example:**

```
"Accumulated depreciation > 0 AND
Free cash flow 10years < 0"
```

Next Steps
----------

With this RAG engine running, my next steps are:

* **Convert into a microservice:** Serve real-time LLM-powered query translation via REST/gRPC.
* **Deploy as a chatbot-based web app:** Let users chat and instantly get correct Screener query syntax for their "intent".

Summary
-------

* Data was scraped and prepped automatically with Comet.
* One metric+description+aliases = one chunk, keeping queries precise.
* Fast vector search with Pinecone, smart LLM response with LlamaIndex.
* Strict system prompt ensures correct, non-hallucinated Screener queries.