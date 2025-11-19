// Get the current page URL
const currentUrl = window.location.href;

// ❌ Do NOT show the popup on ElderEase homepage (http://localhost:3000/)
if (currentUrl.startsWith("http://localhost:3000/")) {
  console.log("ElderEase extension is disabled on this page:", currentUrl);
} else {
  // ✅ Show popup only on other websites
  if (!document.getElementById("elderEasePopup")) {
    let message = "Need help? Watch ElderEase tutorials!";
    let link = "http://localhost:3000"; // ✅ Always go to ElderEase homepage

    // ✅ Customize messages for different sites
    if (currentUrl.includes("sbi.co.in")) {
        message = "Need help with banking? Watch ElderEase tutorials!";
    } else if (currentUrl.includes("irctc.co.in")) {
        message = "Need help booking train tickets?";
    } else if (currentUrl.includes("licindia.in")) {
        message = "Learn how to manage LIC policies online!";
    } else if (currentUrl.includes("epfindia.gov.in")) {
        message = "Get help with PF & pension services.";
    } else if (currentUrl.includes("incometax.gov.in")) {
        message = "Filing taxes made easy!";
    }

    // ✅ Create popup div
    let popup = document.createElement("div");
    popup.id = "elderEasePopup";
    popup.style.position = "fixed";
    popup.style.bottom = "20px";
    popup.style.right = "20px";
    popup.style.background = "white";
    popup.style.padding = "15px";
    popup.style.border = "2px solid #4CAF50";
    popup.style.borderRadius = "10px";
    popup.style.boxShadow = "2px 2px 10px rgba(0, 0, 0, 0.2)";
    popup.style.fontFamily = "Arial, sans-serif";
    popup.style.fontSize = "14px";
    popup.style.zIndex = "999999";
    popup.style.maxWidth = "250px";
    popup.style.wordWrap = "break-word";
    popup.style.display = "flex";
    popup.style.flexDirection = "column";
    popup.style.alignItems = "center";
    popup.style.justifyContent = "center";

    // ✅ Add popup content
    popup.innerHTML = `
      <p style="margin: 0 0 10px; text-align: center; color: #333333; font-weight: bold;">
        ${message}
      </p>
      <button id="openElderEase" style="
        background: #FF0000; /* Red */
        color: white; 
        border: none; 
        padding: 8px 12px; 
        cursor: pointer; 
        border-radius: 5px;
        margin-bottom: 5px;
        font-weight: bold;
      ">Watch Tutorial</button>
      <button id="closePopup" style="
        background: #4CAF50; /* Green */
        color: white; 
        border: none; 
        padding: 5px 12px; 
        cursor: pointer; 
        border-radius: 5px;
      ">Close</button>
    `;

    document.body.appendChild(popup);

    // ✅ Open ElderEase homepage when clicking "Watch Tutorial"
    document.getElementById("openElderEase").addEventListener("click", function () {
        window.open(link, "_blank"); // ✅ Opens ElderEase in a new tab
    });

    // ✅ Close popup when clicking "Close"
    document.getElementById("closePopup").addEventListener("click", function () {
        popup.remove();
    });

    // ✅ Adjust if popup is out of screen bounds
    function ensurePopupInView() {
        let rect = popup.getBoundingClientRect();
        if (rect.bottom > window.innerHeight) {
            popup.style.bottom = "50px"; // Moves up if it's cut off
        }
        if (rect.right > window.innerWidth) {
            popup.style.right = "50px"; // Moves left if needed
        }
    }

    ensurePopupInView();
    window.addEventListener("resize", ensurePopupInView);
  }
}
