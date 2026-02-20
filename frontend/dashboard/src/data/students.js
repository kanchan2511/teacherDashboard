const classes = ["5A", "5B", "6A", "6B"];

const students = Array.from({ length: 20 }, (_, i) => ({
  id: `STU${String(i + 1).padStart(3, "0")}`,
  name: `Student ${i + 1}`,
  class: classes[i % classes.length],
}));

export default students;