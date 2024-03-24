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
    throw new Error("The assignment does not belong to the given course");
  }

  const result = [];

  learnerSubmissions.forEach((submission) => {
    let learnerResult = result.find(
      (result) => result.id === submission.learner_id
    );
    if (!learnerResult) {
      learnerResult = { id: submission.learner_id, avg: 0 };
      result.push(learnerResult);
    }

    const assignment = assignmentGroup.assignments.find(
      (a) => a.id === submission.assignment_id
    );
    if (!assignment) return; // Skip if assignment not found in the group

    const currentDate = new Date();
    const dueDate = new Date(assignment.due_at);
    if (currentDate < dueDate) return; // Skip if assignment is not yet due

    try {
      if (assignment.points_possible === 0)
        throw new Error("Points possible is zero");
      let score = submission.submission.score;
      const submittedAt = new Date(submission.submission.submitted_at);
      if (submittedAt > dueDate) {
        score -= assignment.points_possible * 0.1; // Deduct 10% for late submission
      }
      const scorePercentage = (score / assignment.points_possible) * 100;

      // Adding score to learner result
      learnerResult[assignment.id] = scorePercentage;

      // Updating average
      if (!learnerResult.totalPoints) {
        learnerResult.totalPoints = 0;
        learnerResult.totalWeight = 0;
      }
      learnerResult.totalPoints += scorePercentage * assignment.points_possible;
      learnerResult.totalWeight += assignment.points_possible;
    } catch (error) {
      console.error("Error processing submission:", error);
    }
  });

  // Calculate final average
  result.forEach((learnerResult) => {
    if (learnerResult.totalWeight > 0) {
      learnerResult.avg = learnerResult.totalPoints / learnerResult.totalWeight;
    }
    delete learnerResult.totalPoints;
    delete learnerResult.totalWeight;
  });

  return result;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);
