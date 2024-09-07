export const sendToWhatsapp = async (message) => {
    // Replace with your actual WhatsApp Business API endpoint
    const whatsappApiEndpoint = "https://your-whatsapp-api-endpoint"; 
  
    // Replace with your actual WhatsApp Business phone number 
    // (in international format, e.g., +1234567890)
    const recipientPhoneNumber = "+91xxxxxxxxxx"; 
  
    try {
      const response = await fetch(whatsappApiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add any necessary authentication headers here (e.g., API key, token)
        },
        body: JSON.stringify({
          to: recipientPhoneNumber,
          message: message, 
          // Add other required parameters based on your API documentation
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to send message to WhatsApp");
      }
  
      console.log("Message sent to WhatsApp successfully!");
    } catch (error) {
      console.error("Error sending message to WhatsApp:", error);
      // Handle the error appropriately (e.g., show an error message to the user)
    }
  };