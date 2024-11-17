import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

const AudienceSegmentForm = () => {
  const [name, setName] = useState("");
  const [conditions, setConditions] = useState({ spending: "", visits: "", lastVisit: "" });
  const [segmentSize, setSegmentSize] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConditions({ ...conditions, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/audience-segments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, conditions }),
      });
      const data = await response.json();
      setSegmentSize(data.segment.size);
      alert("Audience segment created successfully!");
    } catch (error) {
      console.error("Error creating segment:", error.message);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 5, p: 3, border: "1px solid #ccc", borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>
        Create Audience Segment
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Segment Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          sx={{ mb: 3 }}
        />
        <TextField
          fullWidth
          label="Spending Over (INR)"
          name="spending"
          type="number"
          value={conditions.spending}
          onChange={handleChange}
          sx={{ mb: 3 }}
        />
        <TextField
          fullWidth
          label="Visits Less Than or Equal"
          name="visits"
          type="number"
          value={conditions.visits}
          onChange={handleChange}
          sx={{ mb: 3 }}
        />
        <TextField
          fullWidth
          label="Last Visit (Months Ago)"
          name="lastVisit"
          type="number"
          value={conditions.lastVisit}
          onChange={handleChange}
          sx={{ mb: 3 }}
        />
        <Button variant="contained" type="submit" fullWidth>
          Create Segment
        </Button>
      </form>
      {segmentSize !== null && (
        <Typography variant="body1" sx={{ mt: 3 }}>
          Audience Size: {segmentSize}
        </Typography>
      )}
    </Box>
  );
};

export default AudienceSegmentForm;
