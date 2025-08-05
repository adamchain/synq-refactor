import React, { useEffect, useState } from "react";
import { Button, Typography, Spin } from "antd";

const { Text } = Typography;

const CreditCardSection = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    function handleMessage(event) {
      try {
        const data =
          typeof event.data === "string" ? JSON.parse(event.data) : event.data;
        const token = data?.token;
        const expiry = data?.expiry;

        if (token) {
          document.getElementById("mytoken").value = token;
          document.getElementById("myexpiry").value = expiry || "";
        }
      } catch (e) {
        setErrorMessage("Error processing payment information");
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleSaveCard = async () => {
    setErrorMessage("");
    setIsSuccess(false);

    const token = document.getElementById("mytoken").value;
    const expiry = document.getElementById("myexpiry").value;

    if (!token || !expiry) {
      setErrorMessage("Token or expiry not available yet.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/store-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId: props.clientId,
          token,
          expiry,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setIsSuccess(true);
        setErrorMessage("");
      } else {
        setErrorMessage(data.message || "Failed to save card information");
      }
    } catch (err) {
      setErrorMessage("Network error saving card");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ marginTop: 16 }}>
      <iframe
        id="tokenFrame"
        name="tokenFrame"
        src="https://fts-uat.cardconnect.com/itoke/ajax-tokenizer.html?useexpiry=true&usecvv=true&enhancedresponse=true"
        frameBorder="0"
        scrolling="no"
        width="350"
        height="180"
        title="Secure payment form"
        style={{ border: "1px solid #e5e5e5", borderRadius: 6 }}
      />
      <input type="hidden" id="mytoken" name="mytoken" />
      <input type="hidden" id="myexpiry" name="myexpiry" />

      <Button
        type="primary"
        style={{ marginTop: 16 }}
        loading={isLoading}
        onClick={handleSaveCard}
      >
        Save Card
      </Button>

      {errorMessage && (
        <Text type="danger" style={{ display: "block", marginTop: 10 }}>
          {errorMessage}
        </Text>
      )}
      {isSuccess && (
        <Text type="success" style={{ display: "block", marginTop: 10 }}>
          Card information saved successfully!
        </Text>
      )}
    </div>
  );
};

export default CreditCardSection;
