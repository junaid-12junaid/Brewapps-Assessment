# Brewapps-Assessment



### Model

- Books Model
```yaml
{ 
  title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    summary: {
        type: String,
        required: true,
        trim: true
    },
    deletedAt: {
        type: Date
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
  createdAt: {timestamp},
  updatedAt: {timestamp},
}
```

## Books API
### POST /book
- Create a book document from request body.
- Return HTTP status 201 on a succesful book creation. Also return the book document. The response should be a JSON object.
- Return HTTP status 400 for an invalid request with a response body.

### GET /book
- Returns all books in the collection that aren't deleted. Return only book _id, title,author,summary.
- Return the HTTP status 200 if any documents are found. 
- If no documents are found then return an HTTP status 404 with a response. 

### GET /book/:bookId
- Returns a book details with provided bookId. 
- Return the HTTP status 200 if any documents are found.
- If no documents are found then return an HTTP status 404 with a response. 

### PUT /book/:bookId
- Update a book by changing its
  - title
  - author
  - summary
- Check if the bookId exists (must have isDeleted false and is present in collection). If it doesn't, return an HTTP status 404 with a response.
- Return an HTTP status 200 if updated successfully.
- Also make sure in the response you return the updated book document. 

### DELETE /book/:bookId
- Check if the bookId exists and is not deleted. If it does, mark it deleted and return an HTTP status 200 with a response body with status and message.
- If the book document doesn't exist then return an HTTP status of 404 . 


## Response

### Successful Response structure
```yaml
{
  status: true,
  message: 'Success',
  data: {

  }
}
```
### Error Response structure
```yaml
{
  status: false,
  message: ""
}
```

## Collections

### books
```yaml
{
            "_id": "653f9d201d52b6cc3b4c4c16",
            "title": "The Best Human",
            "author": "Jhon2",
            "summary": "To be happy"
        }
```



## Response examples
### Get books response
```yaml
{
    "status": true,
    "msg": "Books list",
    "BooksCount": 2,
    "data": [
        {
            "_id": "653f9d201d52b6cc3b4c4c16",
            "title": "sdfewwe",
            "author": "Jhon2",
            "summary": "To be happy"
        },
        {
            "_id": "653f9d401d52b6cc3b4c4c19",
            "title": "Wonderfull nature",
            "author": "Jhon2",
            "summary": "To be happy"
        }
    ]
}
```

### Book detail response
```yaml
{
    "status": true,
    "msg": "Details of Book",
    "data": {
        "_id": "653f9d401d52b6cc3b4c4c19",
        "title": "Wonderfull nature",
        "author": "Jhon2",
        "summary": "To be happy"
    }
}
```
