import axios from "axios";

export default axios.create({
  headers: {
    "Content-type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3VzZXJkYXRhIjoiOTExZDQ2YzItMGZmNi00OWUxLWIzNjItNjYyOTNiMGY3YjI5IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiVXNlciIsImV4cCI6MTY3NjUyMTQ0MCwiaXNzIjoiSW50ZXJuc2hpcEF1dGhlbnRpY2F0aW9uUHJvamVjdCIsImF1ZCI6IkV2ZXJ5b25lIn0.xGfJZixMdTBxYxA0srFJxhq-TP--tgAK90LOVqPqD48",
  },
});