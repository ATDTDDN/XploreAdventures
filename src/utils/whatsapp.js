export const sendToWhatsapp = async (message) => {
  const recipientPhoneNumber = "+919997526162"; // Replace with your actual WhatsApp Business phone number 

  try {
    // Construct the WhatsApp "Click to Chat" URL
    const whatsappUrl = `https://wa.me/${recipientPhoneNumber}?text=${encodeURIComponent(message)}`;

    // Open the URL in a new window or tab
    window.open(whatsappUrl, '_blank'); 

    console.log("WhatsApp chat initiated successfully!");
  } catch (error) {
    console.error("Error initiating WhatsApp chat:", error);
    // Handle the error appropriately (e.g., show an error message to the user)
  }
};