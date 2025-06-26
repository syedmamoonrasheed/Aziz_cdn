(function() {
  // 1. Create and append the CSS styles
  const style = document.createElement("style");
  style.textContent = `
    /* RESET & BASIC STYLES */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    }
    body {
      background-color: #f5f7fa;
      min-height: 100vh;
      position: relative;
    }
    /* FLOATING CALL BUTTON */
    .floating-call-btn {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: linear-gradient(135deg, #06CC64, #06CC64);
      color: #050C3A;
      border: none;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 999;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .floating-call-btn:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 16px rgba(0,0,0,0.2);
    }
    .floating-call-btn:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(107, 33, 168, 0.3);
    }
    /* POPUP WRAPPER */
    .popup {
      position: fixed;
      bottom: 100px;
      right: 24px;
      width: 360px;
      max-width: 90%;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
      background-color: #050C3A;
      display: none;
      z-index: 1000;
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.3s ease, transform 0.3s ease;
    }
    .popup.show {
      display: block;
      opacity: 1;
      transform: translateY(0);
    }
    /* CARD INSIDE POPUP */
    .bland-card {
      border-radius: 12px;
      overflow: hidden;
    }
    /* TOP SECTION */
    .bland-card-header {
      padding: 20px;
      display: flex;
      align-items: center;
      background-color: #050C3A;
      border-bottom: 1px solid #e5e7eb;
    }
    .brand-icon {
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, #06CC64, #A855F7);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 16px;
    }
    .brand-icon span {
      color: #050C3A;
      font-weight: 700;
      font-size: 1.5rem;
    }
    .card-texts {
      display: flex;
      flex-direction: column;
    }
    .card-texts h2 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 6px;
      color: #ffffff;
    }
    .card-texts p {
      font-size: 0.875rem;
      color: #6b7280;
    }
    /* Dynamic time in top-right corner */
    .card-time {
      position: absolute;
      top: 10px;
      right: 15px;
      font-size: 0.875rem;
      color: #6b7280;
      font-weight: 500;
    }
    /* BOTTOM SECTION */
    .bland-card-body {
      background-color: #050C3A;
      padding: 20px;
    }
    /* Styling select and input elements */
    .agent-select,
    .phone-input {
      width: 100%;
      padding: 12px 16px;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      margin-bottom: 8px;
      font-size: 0.9375rem;
      color: #1f2a44;
      background-color: #f9fafb;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }
    .agent-select:focus,
    .phone-input:focus {
      outline: none;
      border-color: #06CC64;
      box-shadow: 0 0 0 3px rgba(107, 33, 168, 0.1);
    }
    .agent-select.error,
    .phone-input.error {
      border-color: #dc2626;
    }
    .error-message {
      color: #dc2626;
      font-size: 0.75rem;
      margin-bottom: 8px;
      display: none;
    }
    .error-message.show {
      display: block;
    }
    .talk-btn {
      width: 100%;
      padding: 12px;
      background: linear-gradient(135deg, #06CC64, #06CC64);
      color: #050C3A;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: opacity 0.2s ease, transform 0.2s ease;
    }
    .talk-btn:hover {
      opacity: 0.9;
      transform: translateY(-1px);
    }
    .talk-btn:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(107, 33, 168, 0.3);
    }
    .talk-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    /* Responsive Design */
    @media (max-width: 480px) {
      .popup {
        width: 95%;
        bottom: 80px;
        right: 50%;
        transform: translateX(50%) translateY(20px);
      }
      .popup.show {
        transform: translateX(50%) translateY(0);
      }
      .floating-call-btn {
        bottom: 16px;
        right: 16px;
      }
    }
  `;
  document.head.appendChild(style);

  // 2. Create the floating call button with phone icon SVG
  const floatingButton = document.createElement("button");
  floatingButton.className = "floating-call-btn";
  floatingButton.id = "togglePopupBtn";
  floatingButton.setAttribute("aria-label", "Open call popup");
  floatingButton.innerHTML = `
    <svg width="24" height="24" fill="none" stroke="#050C3A" stroke-width="2" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
    </svg>
  `;
  document.body.appendChild(floatingButton);

  // 3. Create the popup container and card structure
  const popup = document.createElement("div");
  popup.className = "popup";
  popup.id = "popup";
  popup.setAttribute("aria-hidden", "true");

  // Create card container
  const blandCard = document.createElement("div");
  blandCard.className = "bland-card";
  popup.appendChild(blandCard);

  // Create top section (header)
  const blandCardHeader = document.createElement("div");
  blandCardHeader.className = "bland-card-header";
  blandCard.appendChild(blandCardHeader);

  // Brand icon inside header
  const brandIcon = document.createElement("div");
  brandIcon.className = "brand-icon";
  const brandIconSpan = document.createElement("span");
  brandIconSpan.textContent = "AI";
  brandIcon.appendChild(brandIconSpan);
  blandCardHeader.appendChild(brandIcon);

  // Text container for header
  const cardTexts = document.createElement("div");
  cardTexts.className = "card-texts";
  const headerTitle = document.createElement("h2");
  headerTitle.textContent = "Talk With Our Agents";
  const headerSub = document.createElement("p");
  headerSub.textContent = "Revolutionize Customer Communication";
  cardTexts.appendChild(headerTitle);
  cardTexts.appendChild(headerSub);
  blandCardHeader.appendChild(cardTexts);

  // Dynamic time display in header
  const cardTime = document.createElement("span");
  cardTime.className = "card-time";
  cardTime.id = "cardTime";
  cardTime.textContent = "9:41 AM"; // initial placeholder
  blandCardHeader.appendChild(cardTime);

  // Create bottom section (card body)
  const blandCardBody = document.createElement("div");
  blandCardBody.className = "bland-card-body";
  blandCard.appendChild(blandCardBody);

  // Agent Dropdown
  const agentSelect = document.createElement("select");
  agentSelect.id = "agent_select";
  agentSelect.className = "agent-select";
  agentSelect.setAttribute("aria-label", "Select an AI agent");
  agentSelect.innerHTML = '<option value="">Select an Agent</option>';
  blandCardBody.appendChild(agentSelect);

  // Agent Error Message
  const agentError = document.createElement("div");
  agentError.className = "error-message";
  agentError.id = "agentError";
  agentError.textContent = "Please select an agent.";
  blandCardBody.appendChild(agentError);

  // Phone Number Input
  const phoneInput = document.createElement("input");
  phoneInput.type = "tel";
  phoneInput.className = "phone-input";
  phoneInput.id = "phoneInput";
  phoneInput.placeholder = "Enter Phone Number";
  phoneInput.setAttribute("aria-label", "Enter your phone number");
  blandCardBody.appendChild(phoneInput);

  // Phone Error Message
  const phoneError = document.createElement("div");
  phoneError.className = "error-message";
  phoneError.id = "phoneError";
  phoneError.textContent = "Please enter a valid phone number.";
  blandCardBody.appendChild(phoneError);

  // "Let's Talk" Button
  const talkBtn = document.createElement("button");
  talkBtn.className = "talk-btn";
  talkBtn.id = "talkBtn";
  talkBtn.textContent = "Let's Talk";
  talkBtn.setAttribute("aria-label", "Initiate call");
  blandCardBody.appendChild(talkBtn);

  // Append popup to body
  document.body.appendChild(popup);

  // 4. Add JavaScript functionality

  // Toggle popup visibility
  floatingButton.addEventListener("click", () => {
    const isShown = popup.classList.toggle("show");
    popup.setAttribute("aria-hidden", !isShown);
    if (isShown) {
      agentSelect.focus();
    }
  });

  // Close popup when clicking outside
  document.addEventListener("click", (e) => {
    if (!popup.contains(e.target) && !floatingButton.contains(e.target) && popup.classList.contains("show")) {
      popup.classList.remove("show");
      popup.setAttribute("aria-hidden", "true");
    }
  });

  // Dynamic time update (12-hour format)
  function updateCardTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    cardTime.textContent = `${hours}:${minutes} ${ampm}`;
    setTimeout(updateCardTime, 60000); // Update every minute
  }
  updateCardTime();

  // Populate agent dropdown
  fetch("https://mark-cdn.aireceptionistpro.com/get-agent-names")
    .then(response => response.json())
    .then(agents => {
      agentSelect.innerHTML = '<option value="">Select an Agent</option>';
      agents.forEach(agent => {
        const option = document.createElement("option");
        option.value = agent.agent_index;
        option.textContent = agent.agent_name || `Agent ${agent.agent_index + 1}`;
        agentSelect.appendChild(option);
      });
    })
    .catch(error => console.error("Error loading agents:", error));

  // Handle "Let's Talk" button click
  talkBtn.addEventListener("click", function() {
    const phoneNumber = phoneInput.value.trim();
    const selectedAgentId = agentSelect.value;

    // Reset error states
    phoneInput.classList.remove("error");
    agentSelect.classList.remove("error");
    phoneError.classList.remove("show");
    agentError.classList.remove("show");

    // Validation
    let isValid = true;
    if (!phoneNumber) {
      phoneInput.classList.add("error");
      phoneError.classList.add("show");
      phoneInput.focus();
      isValid = false;
    }
    if (!selectedAgentId) {
      agentSelect.classList.add("error");
      agentError.classList.add("show");
      agentSelect.focus();
      isValid = false;
    }
    if (!isValid) return;

    // Disable button and show sending state
    talkBtn.disabled = true;
    talkBtn.textContent = "Sending...";
    fetch("https://mark-cdn.aireceptionistpro.com/send_call", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone_number: phoneNumber,
        agent_index: selectedAgentId
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("Call response:", data);
        talkBtn.textContent = "Call Sent";
        phoneInput.value = "";
        agentSelect.value = "";
        // Delay closing popup to show "Call Sent" message
        setTimeout(() => {
          popup.classList.remove("show");
          popup.setAttribute("aria-hidden", "true");
          talkBtn.textContent = "Let's Talk";
        }, 2000);
      })
      .catch(err => {
        console.error("Call error:", err);
        talkBtn.textContent = "Failed to Send";
        // Reset button text after 2 seconds
        setTimeout(() => {
          talkBtn.textContent = "Let's Talk";
        }, 2000);
      })
      .finally(() => {
        talkBtn.disabled = false;
      });
  });

  // Add basic phone number validation
  phoneInput.addEventListener("input", () => {
    phoneInput.classList.remove("error");
    phoneError.classList.remove("show");
    const phoneRegex = /^\+?[\d\s-]{7,}$/;
    if (phoneInput.value && !phoneRegex.test(phoneInput.value)) {
      phoneInput.classList.add("error");
      phoneError.classList.add("show");
    }
  });

  // Remove error state when agent is selected
  agentSelect.addEventListener("change", () => {
    agentSelect.classList.remove("error");
    agentError.classList.remove("show");
  });
})();
