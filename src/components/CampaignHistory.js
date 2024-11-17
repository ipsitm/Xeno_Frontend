import React, { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";

const CampaignHistory = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/campaigns/history`);
        const data = await response.json();
        console.log("API Response:", data); // Debug
        setCampaigns(data.campaigns || []); // Ensure it's an array
      } catch (error) {
        console.error("Error fetching campaigns:", error.message);
        setCampaigns([]); // Prevent rendering errors
      }
    };

    fetchCampaigns();
  }, []);

  const styles = {
    card: {
      backgroundColor: "#f9f9f9",
      padding: "15px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      marginBottom: "20px",
    },
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 5, p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, textAlign: "center", color: "#333" }}>
        Campaign History
      </Typography>
      {Array.isArray(campaigns) && campaigns.length > 0 ? (
        <Grid container spacing={3}>
          {campaigns.map((campaign) => (
            <Grid item xs={12} key={campaign._id}>
              <Box style={styles.card}>
                <Typography variant="h6" gutterBottom>
                  Message: {campaign.message}
                </Typography>
                <Typography variant="body1">
                  <strong>Date Sent:</strong> {new Date(campaign.createdAt).toLocaleDateString()}
                </Typography>
                <Typography variant="body1">
                  <strong>Audience Size:</strong> {campaign.audienceSize}
                </Typography>
                <Typography variant="body1">
                  <strong>Sent:</strong> {campaign.sentCount}
                </Typography>
                <Typography variant="body1">
                  <strong>Failed:</strong> {campaign.failedCount}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" sx={{ textAlign: "center", color: "#777" }}>
          No campaign history found.
        </Typography>
      )}
    </Box>
  );
};

export default CampaignHistory;
