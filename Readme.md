# @zyporai/nlp_text_to_db_query

## What is this?

This package will allow you to build ready-to-use queries for execute in your Open Search database using Structured generation.

**This project use OpenAI for build your queries, that's why you MUST sign up and have and [OpenAI Key](https://platform.openai.com/docs/quickstart).**

## Installing

### NPM

```bash
npm i @zyporai/nlp_text_to_db_query
```

### YARN

```bash
yarn add @zyporai/nlp_text_to_db_query
```

## How to use

## Requirement

Make sure that ```OPENAI_API_KEY``` environment variable is properly set and accessible.

### The explanation file

The ```explanationFile.json``` must be accessible in the project root.

```text
...
...
 - explainFile.json
 - package.json
...
...
```

This file must describe the fields, what's store each one and how must be treated.

More descriptive fields will help us to give you more accurate results from your data source. You can add some rules in case of needing.

#### Example

This example is contextualized for a class of student of any grade.

```json
{
    "queryFormat":"opensearch",
    "schema": [
        {
            "name":"firstname",
            "is":"is a string that store the name of a person."
        },
        {
            "name":"birthday",
            "is":"is a date attribute the store the birthday of a person."
        },
        {
            "name":"gender",
            "is":"describe the gender of the student, this field could be 'F' or 'M' only, 'F' for feminine and 'M' for masculine."
        },
        {
            "name":"score",
            "is":"is a number that store the amount of point gathered in maths by this student, the number of points  define the level of intelligence of each person, while higher the score, more important or smart is the student. smartest student have more that 60 score points"
        },
        {
            "name":"country",
            "is":"this field stores the code of country of residence of this person, this code is formatted as alpha-2 code. example United States is US, Cuba is CU"
        }
    ]
}
```

### Run explanation file parser

This function must be called as soon as possible when server start.

```javascript
const { parseExplainFile } = require("@zyporai/nlp_text_to_db_query");

...
 await parseExplainFile();
...
...
 ```

 this function also accept a custom route for this file

 ```javascript
 await parseExplainFile('mycustomfile.json');
 ```

### Create a query for a question

Create a query for a **question**

 ``` javascript
...
  const { getOpenSearchQuery } = require("@zyporai/nlp_text_to_db_query");
...

router.get("/", async (req, res) => {
 // Getting question
  const question = req.query.q;

  // Error if not question
  if (!question) {
    res.status(400).json({
      error: "not query found",
    });
    return;
  }

  // Build query from natural language (question)
  const osQuery = await getOpenSearchQuery(question);

  //TODO: Use your query
 
});

```

## How to test

### ES Module

``` OPENAI_API_KEY=sk-xxx npm run test_es ```

### Common Module

``` OPENAI_API_KEY=sk-xxxx npm run test_co ```

## DISCLAIMER

Please note that this is an experimental project and some security issue must appear, use this project very careful. We'e working in order to mitigate all security risks.
