# Machine Learning with Javascript

Machine Learning with Javascript by Stephen Grider

## Folder structure

- ../resources
  - MLKits - starter kits
  - MLCasts - complete code
- 01-introduction
  - plinko
- 02-algorithm
  - plinko : using lodash
  - `node index.js`
- 03-tensorflow: tensorflow features for house price project
- 04-tf-app
  - knn-tf-house-price: house price
- 06 ~ 09 -> regressions
- 14-loadcsv
  - loadcsv: csv loading project

## Details

<details open>
  <summary>Click to Contract/Expend</summary>

## Section 1: What is Machine Learning?

### 2. Course Resources

[View diagrams](https://www.diagrams.net/)

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

![Plinko](./resources/images/plinko.png)

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

### 13. Lodash Review

[lodash doc](https://lodash.com/docs)

### 17. Interpreting Bad Results

1. Adjust the parameters of the analysis
   `const k = 3;`
2. Add more features to explain the analysis
3. Change the prediction point
4. Accept that maybe there isn't a good correlation

### 25. Updating KNN for Multiple Features

Start "2. Add more features to explain the analysis"

Pythagorean Theorem : a^2 + b^2 = c^2

### 26. Multi-Dimensional KNN

Pythagorean Theorem \
`C = (A ** 2 + B ** 2) ** 0.5`

```js
const outputs = [
  [40, 0.5, 16, 1],
  [150, 0.52, 16, 2],
  [350, 0.55, 16, 2],
  [425, 0.53, 16, 3]
];
const target = [323, 0.52, 16, 2];

C ** 2 = A ** 2 + B ** 2
C = (A ** 2 + B ** 2) ** 0.5
C = ((350 - 323) ** 2) + ((0.55 - 0.52) ** 2) ** 0.5
```

3D Pythagorean Theorem : a^2 + b^2 = c^2
`D = (A ** 2 + B ** 2 + C ** 2) ** 0.5`

### 30. Feature Normalization

`Normalized Dataset = (FeatureValue - min) / (max - min)`

### 33. Feature Selection with KNN

Not all features give us a good guess. \
Some features are not giving us good accuracy

### 35. Evaluating Different Feature Values

```js
the length of data:  1596
score.js:47 For feature of 0 accuracy: 0.32
score.js:47 For feature of 1 accuracy: 0.15
score.js:47 For feature of 2 accuracy: 0.03
```

dropPosition is a good selection feature \
bounciness and size are not

## Section 3: Onwards to Tensorflow JS!

### 36. Let's Get Our Bearings

- Features vs Labels
- Test vs Trainnig sets of data
- Feature Normalization
- Common data structures (arrays of arrays)
- Feature Selection

#### Lodash

- Pros
  - Methods for just about everything we need
  - Excellent API design (especially chain!)
  - Skills transferrable to other JS projects
- Cons
  - Extremely slow (relatively)
  - Not 'numbers' focused
  - Some things are awkward (getting a column of values)

#### Tensorflow JS

- Pros
  - Similar API to Lodash
  - Extremely fast for numeric calculations
  - Has a 'low level' linear algebra API + higher level API for ML
  - Similar api to numpy - popular Python numerical lib
- Cons
  - Still in active development

### 38. Tensor Shape and Dimension

[TesorFlow.js Doc](https://js.tensorflow.org/api/4.0.0/)

- `[]` : 1 Dimentional
- `[[]]` : 2 Dimentional
- `[[[]]]` : 3 Dimentional

#### Shape

```js
// 1 dimentional
[5, 10, 17].length -> [3] shape

// 2 dimentional
[
  [5, 10, 17],
  [5, 10, 17].length,
].length -> [2, 3] shape

// 3 dimentional
[
  [
    [5, 10, 17].length,
  ].length
].length -> [1, 1, 3] shape
```

> 2D is the most important dimention we will work with \
> [# rows, # columns] -> [2, 3]

### 41. Broadcasting Operations

Brodcasting works when

- Take shape of both tensor -> From right to left, the shapes are equal or one is '1'

- Shape[3] and Shape[1] => O
  - [3]
  - [1]
- Shape[2, 3] and Shape [2, 1] => O
  - [2, 3]
  - [2, 1]
- Shape[2, 3, 2] and Shape [3, 1] => O
  - [2, 3, 2]
  - [ , 3, 1]
- Shape[2, 3, 2] and Shape [2, 1] => X
  - [2, 3, 2]
  - [ , 2, 1]

## Section 4: Applications of Tensorflow

### 49. KNN with Regression

- Which bucket will a ball go into? -> Classification
- What is the price of a house? -> Regressions

#### KNN Algorithm

- Find distance between features and prediction point
- Sort from lowest point to greatest
- Take the top K records
- Average the label value of those top K records

### 50. A Change in Data Structure

#### Differences between plinko and house-price

```js
// plinko
// features and bucket were in the same structure
[
  [350, 0.55, 16, 2],
  [350, 0.55, 16, 2]
];

// house-price
// features and labels are separated
const features = [
  [84, 83],
  [84.1, 85]
];
const housePrice = [[200], [250]];
```

### 51. KNN with Tensorflow

distance = ((lon - lon) ** 2 + (lat - lat) ** 2) \*\* 0.5

### 53. Sorting Tensors

- [tf.unstack](https://js.tensorflow.org/api/latest/?utm_source=www.tensorflow.org&utm_medium=referral&_gl=1*d01f2p*_ga*NDQxMTA5NTQ4LjE2NzA2MjMzMzQ.*_ga_W0YLR4190T*MTY3MDkxMjgzMi40LjEuMTY3MDkxMjgzMy4wLjAuMA..#unstack)
- make the tensor data to a normal javascript array

### 55. Moving to the Editor

```sh
npm install --save @tensorflow/tfjs-node lodash shuffle-seed
```

### 58. Reporting Error Percentages

Initial analysis

```sh
Error: 15% Guess: 925420 , Expected 1085000
Error: -36% Guess: 636235 , Expected 466800
Error: -11% Guess: 472810 , Expected 425000
Error: -23% Guess: 695514.3 , Expected 565000
Error: 21% Guess: 600730 , Expected 759000
Error: -12% Guess: 573287.2 , Expected 512031
Error: -1% Guess: 773849.5 , Expected 768000
Error: 75% Guess: 381626.2 , Expected 1532500
Error: -199% Guess: 613175 , Expected 204950
Error: -71% Guess: 423569.9 , Expected 247000
```

### 59. Normalization or Standardization?

for exmaple, if one value is extremely high or low \
Normalization wouldn't mean much. \
Then standardization would be a better option

### 60. Numerical Standardization with Tensorflow

(Value - Aaverage) / StandardDeviation

StandardDeviation = sqrt(variance)\
StandardDeviation = variance \*\* 0.5

### 61. Applying Standardization

```sh
# dataColumns: ['lat', 'long', 'sqft_lot'],
Error: -15% Guess: 1245050 , Expected 1085000
Error: -64% Guess: 765837.1 , Expected 466800
Error: -100% Guess: 848675 , Expected 425000
Error: -38% Guess: 781742 , Expected 565000
Error: -3% Guess: 781470 , Expected 759000
Error: 0% Guess: 514000 , Expected 512031
Error: -6% Guess: 814785 , Expected 768000
Error: 49% Guess: 774700 , Expected 1532500
Error: -19% Guess: 243402.5 , Expected 204950
Error: 2% Guess: 242865 , Expected 247000
```

### 62. Debugging Calculations

```sh
node --inspect-brk index.js
```

And navigate `about:inspect` on the browser\

We can inspect the code using breaking points and console

```js
features.sub(mean).div(variance.pow(0.5)).print();
features
  .sub(mean)
  .div(variance.pow(0.5))
  // .sub(predictionPoint)
  .sub(scaledPrediction)
  .pow(2)
  .sum(1)
  .pow(0.5)
  .print();
```

### 63. What Now?

```sh
# tremendous improvement!
# dataColumns: ['lat', 'long', 'sqft_lot', 'sqft_living'],
node index.js
Error: -15% Guess: 1251260 , Expected 1085000
Error: -11% Guess: 519756.5 , Expected 466800
Error: -2% Guess: 433700 , Expected 425000
Error: 19% Guess: 455800 , Expected 565000
Error: 8% Guess: 699750 , Expected 759000
Error: -14% Guess: 584260 , Expected 512031
Error: -9% Guess: 835450 , Expected 768000
Error: 13% Guess: 1329790 , Expected 1532500
Error: -36% Guess: 279422.5 , Expected 204950
Error: 7% Guess: 228767.5 , Expected 247000
```

## Section 5: Getting Started with Gradient Descent

### 64. Linear Regression

- Pros
  - Fast! Only train one time, then use for any prediction
  - Uses methods that will be very important in more complicated ML
- Cons
  - Lot harder to understand intuitively

### 65. Why Linear Regression?

`price = 200 * Lot Size + 3000`

#### in Google doc,

you can create a chart and add a trend line based on the base (Use Equiation)\
But that's for only one independent variable - dependent variable

> With linear regression, we can use arbitrary numbers of independent variable to one output

### 66. Understanding Gradient Descent

#### Methods of Solving linear regression

- Ordinary Least Squares
- Generalized Least Squares
- ...others
- Gradient Descent

#### Mean Squared Error (MSE)

![MSE](./resources/images/mean_squared_error.svg)

- \mathrm{MSE} = mean squared error
- {n} = number of data points
- Y\_{i} = observed values
- \hat{Y}\_{i} = predicted values

#### Let's guess

- bad guess: `y = 0x + 1`
- How wrong were we?
  - Mean Squared Error
    - `((1-200)**2 + (1-230)**2 + (1-245)**2 + (1-274)**2 + (1-259)**2 + (1-262)**2) / 6`
    - 360792 / 6 = 60132
- better guess: `y = 0x + 200`
  - Mean Squared Error
    - `((200-200)**2 + (200-230)**2 + (200-245)**2 + (200-274)**2 + (200-259)**2 + (200-262)**2) / 6`
    - 15726 / 6 = 2621

#### What's a good guess?

- `Price = m * Lot Size + b`
- 'm' and 'b' will be as correct as they can be when MSE is as low as possible

### 67. Guessing Coefficients with MSE

![MSE graph](./resources/images/mse_graph.png)
[MSE graph.xlsx](./resources/mse_graph.xlsx)

> We need to find the lowerest MSE

#### Issues with this approach

- - `Price = m * Lot Size + b`
- Don't know the possible range of b
- Don't know a step size for incrementing b
- Huge computational demands when adding in more features

### 69. Derivatives!

- [Wolfram Alpha - Computational Intelligence](https://www.wolframalpha.com/)
- `y = x^2 + 5`
  ![y = x^2 + 5 plot](./resources/images/y%3Dx%5E2%2B51_plot.gif)
- search `derivative x^2 + 5` \
  ![derivative_x^2+5](./resources/images/derivative_x%5E2%2B5.gif)
- `derivative x^2 + 5`: y value means slope
  ![derivative x^2 + 5 plot](./resources/images/derivative_x%5E2%2B5_plot.gif)

### 70. Gradient Descent in Action

1. Pick a value for 'b'
2. Calculate the slope of MSE with b : derivative
3. Is the slope very, very small? If yes, we are done!
4. Multiply the slope by an arbitrary small value called a 'learning rate'
5. Subtract that from 'b'
   - Go back to 2

### 72. Why a Learning Rate?

[[Gradient Descent] Sheet on MSE graph.xlsx](./resources/mse_graph.xlsx)

### 73. Answering Common Questions

- Why worry about derivatives? Just calculate MSE twice and compare the two values
  - by `Slope of MSE` is already doing that calculation
- We want slope of 0, so why not set the derivative equial to 0 and solve for b?

### 74. Gradient Descent with Multiple Terms

1. Pick a value for 'b' and 'm'
2. Calculate the slope of MSE with respect to 'm' and 'b': derivative
3. Is the slope very, very small? If yes, we are done!
4. Multiply the slope by an arbitrary small value called a 'learning rate'
5. Subtract that from 'b' and 'm'
   - Go back to 2

## Section 6: Gradient Descent with Tensorflow

### 76. Project Overview

Miles Per Gallon = m \* (Car Horsepower) + b

![formula-MSE](./resources/images/formula-MSE.jpg)\
![formula-slope-MSE-b](./resources/images/formula-slope-MSE-b.jpg)\
![formula-slope-MSE-m](./resources/images/formula-slope-MSE-m.jpg)

### 84. Matrix Multiplication

Linear Algebra operation between two matrices(=tensor)

- Are two matrices eligible to be multipled together?
- What's the output of matrix multiplication
- How is matrix multiplication done?

#### For example

- shape [4, 2] and shape [2, 3]
  - Inner shape values are the same -> Eligible for matrix multiplication
  - [4, 3]

### 85. More on Matrix Multiplication

```js
matrix_a = [
  [1, 5],
  [2, 6],
  [3, 7],
  [4, 8]
];
matrix_b = [
  [10, 30, 50],
  [20, 40, 60]
];
```

**Matrix C**

|                     |                 |     |
| ------------------- | --------------- | --- |
| 1\*10 + 5\*20 = 110 | 30 + 200 = 230  | 350 |
| 2\*10 + 6\*20 = 140 | 60 + 240 = 300  | 460 |
| 170                 | 90 + 280 = 370  | 570 |
| 200                 | 120 + 320 = 440 | 680 |

### 86. Matrix Form of Slope Equations

- Slope of MSE with respect to M and B: `(Features * ((Features * Weights) - Labels)) / n `
- Labels: Tensor of our label data
- Features: Tensor of our feature data
- n: Number of observations
- Weights: M and B in a tensor

### 87. Simplification with Matrix Multiplication

```js
Engine HorsePower = [
  // [engine horse, arbitrary column of 1's]
  [x1, 1],
  [x2, 1],
  [x3, 1],
  [x4, 1],
  [x5, 1],
  [x6, 1],
] // shape [6, 2]

Weights = [
  [m],
  [b]
] // [2, 1]
```

| -> [6, 1]   |
| ----------- |
| m \* x1 + b |
| m \* x2 + b |
| m \* x3 + b |
| m \* x4 + b |
| m \* x5 + b |
| m \* x6 + b |

### 88. How it All Works Together!

```js
// 1.
Transposed Engine HorsePower = [
  [x1, x2, x3, x4, x5, x6],
  [ 1,  1,  1,  1,  1,  1]
] // [2, 6]

// 2. [6, 1]
differences[6] = "resultOf87".sub(actual[6])
// d = difference
```

Matrix multification

| -> [2, 1]                                                       |
| --------------------------------------------------------------- |
| x1 \* d1 + x2 \* d2 + x3 \* d3 + x4 \* d4 + x5 \* d5 + x6 \* d6 |
| d1 + d2 + d3 + d4 + d5 + d6                                     |

| it means                                |
| --------------------------------------- |
| mSlope = .sum(horsepower \* difference) |
| bSlope = .sum(difference)               |

## Section 7: Increasing Performance with Vectorized Solutions

### 89. Refactoring the Linear Regression Class

1. Refactor constructor to make 'features' and 'labels' into tensors
2. Append a column of one's to the feature tensor
3. Make a tensor for our weights as well
4. Refactor 'gradientDescent' function to use the new equation

### 91. A Few More Changes

Google it : `Vectorized of gradient descent in linear regression`

### 93. Calculating Model Accuracy

Coefficient of Determination

- `R ** 2 = 1 - (SS(res) / SS(tot))`
- SS(tot): Total sum of squares, (Actual + Average) \*\* 2
- SS(res): Sum of squares of residuals, (Actual + Predicted) \*\* 2

### 95. Dealing with Bad Accuracy

```sh
node index.js
# R2 is -3.0282658720681175
```

### 98. Reapplying Standardization

```sh
node index.js
# R2 is -10.938349176819127
```

### 100. Massaging Learning Rates

```sh
node index.js
# R2 is 0.6048547748640769
```

### 101. Moving Towards Multivariate Regression

`MPG = b + (m1 * Weight) + (m2 * Displacement) + (m3 * Horsepower)`

- Univariate Linear Regressions: `y = b + (m * x)`
- Multivariate Linear Regressions: `y = b + (m1 * x1) + (m2 * x2) + (m3 * x3)`

### 102. Refactoring for Multivariate Analysis

- `learningRate: 1` -> R2 is -Infinity
- `learningRate: 0.01` -> R2 is -0.8926304296686307
- `learningRate: 0.5` -> R2 is 0.658514569203041
- `learningRate: 0.1` -> R2 is 0.6609495536468749
- `iterations: 1000` -> R2 is 0.6581457923927724
- `iterations: 100` -> R2 is 0.6609495536468749

### 103. Learning Rate Optimization

#### Some of existing methods to help to adjust learning rate

- Adam
- Adagrad
- RMSProp
- Momentum

#### Custom Learning Rate Optimization

> however, those methods above are a bit too complicated for our case

1. With every interation of GD, calculate the exact value of MSE and store it
2. After running an iteration of GD, look at the current MSE and the old MSE
3. If the MSE went _up_ then we did a bad update, so divide learning rate by 2
4. If the MSE went _down_ then we are going in the right direction! Increase LR by 5%

### 104. Recording MSE History

![MSE for multivariate linear regression](./resources/images/multivariate-mse.jpg)\
![Vectorized MSE for multivariate linear regression](./resources/images/multivariate-vectored-mse.jpg)

## Section 8: Plotting Data with Javascript

### 106. Observing Changing Learning Rate and MSE

> now, the initial learningRate does not matter as it will be adjusted during training

### 107. Plotting MSE Values

> the plot will help us to easily figure how many iterations would be enough

![initial MSE history plot](./08-plot/regressions/mse-history-init.png)

## Section 9: Gradient Descent Alterations

### 109. Batch and Stochastic Gradient Descent

- Gradient Descent: [6, 4]
  - Use entire feature set to update M and B
- Batch Gradients Descent: [3, 4]
  - Use a couple observations at a time to update M and B
- Stochastic Gradient Descent: [1, 4]
  - Use one observation at a time to update M and B

</details>

## Tips

- Node js debugging using chrome:
  - `node --inspect-brk index.js`
  - navigate `about:inspect`
