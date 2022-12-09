# Machine Learning with Javascript

Machine Learning with Javascript by Stephen Grider

## Folder structure

- ../resources
  - MLKits - starter kits
  - MLCasts - complete code
- 01-introduction
  - plinko

## Details

<details open>
  <summary>Click to Contract/Expend</summary>

## Section 1: What is Machine Learning?

### 5. A Complete Walkthrough

#### Problem solving process

1. Identify the independent and dependent variables
   - `Features` are categories of data points that affect the value of a `label`
1. Assemble a set of data related to the problem you're trying to solve
   - Datasets almost always cleanup of formatting
1. Decide on the type of output you are predicting
   - `Regression` used with continuous values, classification used with descrete values
1. Based on type of output, pick an algorithm that will determine a correlation between your `features` and `labels`
   - Many, many different algorithms exist, each with pros and cons
1. Use model generated by algorithm to make a prediction
   - Models relate the value of `features` to the value of `labels`

#### Methods

1. Classification : fewer or two options
   - The value of our labels belong to a discrete set
2. Regression : Arrange
   - The value of our labels belong to a continuous set

### 8. Identifying Relevant Data

![Plinko](./images/plinko.png)

| Feature         | Column                 |
| --------------- | ---------------------- |
| Drop Position   | Bucket a ball lands in |
| Ball Bounciness |                        |
| Ball Size       |                        |

> Change one of Features -> Will probably change Column

### 11. What Type of Problem?

- we choose `Classification` -> Bucket #1 ~ #10
- Algorithm: K-Nearest Neighbor (knn)
  - "Birds of a feather flock together"

### 12. How K-Nearest Neighbor Works

N-Nearest Neighbor (with one independent variable)

</details>
