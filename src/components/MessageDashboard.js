import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MessageDashboard = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Dummy data for logs
  useEffect(() => {
    const dummyLogs = [
      {
        _id: "1",
        message: "Initial message",
        status: "Sent",
        audienceId: "12345",
        name: "Alice",
        createdAt: new Date(),
      },
      {
        _id: "2",
        message: "Reminder email",
        status: "Pending",
        audienceId: "12346",
        name: "Bob",
        createdAt: new Date(),
      },
      {
        _id: "3",
        message: "Follow-up email",
        status: "Failed",
        audienceId: "12347",
        name: "Charlie",
        createdAt: new Date(),
      },
    ];

    setLogs(dummyLogs);
    setLoading(false);
  }, []);

  const styles = {
    container: {
      padding: "20px",
      fontFamily: "'Arial', sans-serif",
      backgroundColor: "#f4f6f8",
      minHeight: "100vh",
    },
    header: {
      fontSize: "2rem",
      marginBottom: "20px",
      color: "#333",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      backgroundColor: "#fff",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    th: {
      backgroundColor: "#4285F4",
      color: "#fff",
      padding: "10px",
      textAlign: "left",
      fontWeight: "bold",
    },
    td: {
      padding: "10px",
      borderBottom: "1px solid #ddd",
      textAlign: "left",
    },
    noMessages: {
      textAlign: "center",
      padding: "20px",
      fontSize: "1.2rem",
      color: "#666",
    },
    loading: {
      textAlign: "center",
      padding: "20px",
      fontSize: "1.2rem",
      color: "#777",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "20px",
    },
    button: {
      padding: "10px 20px",
      backgroundColor: "#4285F4",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "1rem",
    },
    messageForm: {
      marginTop: "20px",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "10px",
      fontSize: "1rem",
      border: "1px solid #ddd",
      borderRadius: "5px",
    },
    submitButton: {
      padding: "10px 20px",
      backgroundColor: "#28a745",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "1rem",
    },
  };

  const sendMessage = () => {
    const personalizedMessages = logs.map((log) => {
      const personalizedMessage = message.replace("[Name]", log.name);
      console.log(`Message to ${log.name}:`, personalizedMessage);
      return {
        audienceId: log.audienceId,
        message: personalizedMessage,
      };
    });

    alert("Messages sent successfully!");
    console.table(personalizedMessages);
  };

  if (loading) {
    return <p style={styles.loading}>Loading communication logs...</p>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => navigate("/customers")}>
          Customers
        </button>
        <button style={styles.button} onClick={() => navigate("/segments")}>
          Segments
        </button>
        <button style={styles.button} onClick={() => navigate("/campaigns")}>
          Campaign History
        </button>
      </div>
      <h1 style={styles.header}>Message Dashboard</h1>
      {logs.length === 0 ? (
        <p style={styles.noMessages}>No messages found.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Message</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Audience ID</th>
              <th style={styles.th}>Sent At</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log._id}>
                <td style={styles.td}>{log.name}</td>
                <td style={styles.td}>{log.message}</td>
                <td style={styles.td}>{log.status}</td>
                <td style={styles.td}>{log.audienceId}</td>
                <td style={styles.td}>
                  {new Date(log.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div style={styles.messageForm}>
        <h2>Send Personalized Messages</h2>
        <textarea
          style={styles.input}
          placeholder="Type your message here. Use [Name] as a placeholder for audience names."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button style={styles.submitButton} onClick={sendMessage}>
          Send Messages
        </button>
      </div>
    </div>
  );
};

export default MessageDashboard;
