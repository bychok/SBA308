![Model](Data-Analysis-Software.jpg)

# Learner Data Analysis Application

## Description

This JavaScript application is designed to process and analyze educational data, specifically focusing on learners' submissions for various assignments. It takes input in the form of course information, assignment groups, and learner submissions, and produces a detailed analysis of each learner's performance. The output includes the learner's ID, their total weighted average considering the points possible for each assignment, and individual assignment scores as percentages.

## Features

- Validates assignment groups to ensure they belong to the correct course.
- Calculates score percentages for each assignment submission, taking into account late submissions by deducting points.
- Computes each learner's total weighted average score across all assignments.
- Handles errors gracefully, including scenarios where assignment points are set to zero.

## How to Use

To use this application, ensure you have a JavaScript runtime environment like Node.js installed. Place the `script.js` file (containing the application code) in your project directory.

1. Prepare your data in the specified format for `CourseInfo`, `AssignmentGroup`, and an array of `LearnerSubmission` objects.
2. Call the `getLearnerData(courseInfo, assignmentGroup, learnerSubmissions)` function with your data as arguments.
3. The function will return an array of objects, each representing a learner's performance analysis.

## Example

Here's a simple example of how to prepare your data and call the function:

```javascript
const courseInfo = { id: 101, name: "JavaScript Fundamentals" };
const assignmentGroup = {
  id: 201,
  name: "Module 1 Assignments",
  course_id: 101,
  group_weight: 100,
  assignments: [
    {
      id: 301,
      name: "Assignment 1",
      due_at: "2024-03-10",
      points_possible: 50,
    },
    // Add more assignments as needed
  ],
};

const learnerSubmissions = [
  {
    learner_id: 401,
    assignment_id: 301,
    submission: { submitted_at: "2024-03-09", score: 45 },
  },
  // Add more submissions as needed
];

const results = getLearnerData(courseInfo, assignmentGroup, learnerSubmissions);
console.log(results);
```
