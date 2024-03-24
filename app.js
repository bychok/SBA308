// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140,
    },
  },
];

function getLearnerData(courseInfo, assignmentGroup, learnerSubmissions) {
  // Check for assignment group belonging to the course
  if (assignmentGroup.course_id !== courseInfo.id) {
    throw new Error(
      `Assignment (ID: ${assignmentGroup.course_id}) does not belong to the given Course (ID: ${courseInfo.id})`
    );
  }

  const results = [];

  // Iterating through learner submissions
  for (const submission of learnerSubmissions) {
    let learnerResult = results.find(
      (result) => result.id === submission.learner_id
    );
    if (!learnerResult) {
      learnerResult = {
        id: submission.learner_id,
        avg: 0,
        totalPoints: 0,
        totalPossible: 0,
      };
      results.push(learnerResult);
    }

    const assignment = assignmentGroup.assignments.find(
      (a) => a.id === submission.assignment_id
    );
    if (!assignment) continue; // Skip if assignment not found in the group

    const currentDate = new Date();
    const dueDate = new Date(assignment.due_at);
    if (currentDate < dueDate) continue; // Skip if assignment is not yet due

    try {
      if (assignment.points_possible === 0)
        throw new Error("Points possible is zero");
      let score = submission.submission.score;
      const submittedAt = new Date(submission.submission.submitted_at);
      if (submittedAt > dueDate) {
        score = Math.max(0, score - assignment.points_possible * 0.1); // Deduct 10% for late submission, not allowing negative scores
      }

      // Calculate and store the score as a percentage, rounded to three decimal places
      const scorePercentage = parseFloat(
        (score / assignment.points_possible).toFixed(3)
      );
      learnerResult[assignment.id] = scorePercentage;

      // Add to total points and total possible for average calculation
      learnerResult.totalPoints += score;
      learnerResult.totalPossible += assignment.points_possible;
    } catch (error) {
      console.error("Error processing submission:", error);
    }
  }

  // Calculate final average for each learner
  for (const learnerResult of results) {
    if (learnerResult.totalPossible > 0) {
      learnerResult.avg = parseFloat(
        (learnerResult.totalPoints / learnerResult.totalPossible).toFixed(3)
      );
    }
    delete learnerResult.totalPoints;
    delete learnerResult.totalPossible;
  }

  return results;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);

const result2 = [
  {
    id: 125,
    avg: 0.985, // (47 + 150) / (50 + 150)
    1: 0.94, // 47 / 50
    2: 1.0, // 150 / 150
  },
  {
    id: 132,
    avg: 0.82, // (39 + 125) / (50 + 150)
    1: 0.78, // 39 / 50
    2: 0.833, // late: (140 - 15) / 150
  },
];

console.log(result2);
