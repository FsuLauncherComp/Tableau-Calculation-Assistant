# Expermintal Tiny LLama2 Trained on Synthetic Data

This is a tiny (~33 Million Parameter) Llama2 model trained on synthetic Tableau Calculation data running on the Edge.

**Model updated on 2023-09-27**

## Disclaimer

The model and tokenizer are in active research development.

Results vary from great to downright terrible. Don't expect consistent results as the model is still in active development.

## Training Data

Generated ~100K Input/Output pairs of questions/instructions related to Tableau Calculations.


## Model Architecture

- The model was then trained using a Llama2 achticture of 8 Layers, 8 Heads, 8 Key/Value Heads, Dimension of 512, and a Feed Forward Dimension of 2048 with a learning rate of 0.0001 for 10K iterations.
- Trained a custom 16K BPE tokenizer on the data.

## Deployment

- Model runs in consumer browswer using WebAssembly.
- Currently no optimizations have been made to the model for deployment (i.e. with WebGPU, etc.).

## Why is this cool?

- This isn't using an AI service API, a cloud service, or a GPU.
- The model is tiny, and can be run on the edge (AKA consumer browser).
- Shows that we can generate massive amounts of synthic data on few resources leveraging a larger model for distillation.
- Using this technique doesn't require fine-tuning for Q&A, and can be used for any type of text generation.
- Runs completely on the edge, no cloud required. So no privacy concerns. And it can Scale to millions of users since it runs on the edge.