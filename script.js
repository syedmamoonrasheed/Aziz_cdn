    (function() {
      // 1. Create and append the CSS styles
      const style = document.createElement("style");
      style.textContent = `
        /* RESET & BASIC STYLES */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: Arial, sans-serif;
        }
        body {
          background-color: #f9f9f9;
          min-height: 100vh;
          position: relative;
        }
        /* FLOATING CALL BUTTON */
        .floating-call-btn {
          position: fixed;
          bottom: 30px;
          right: 30px;
          background-color: #9A58E1;
          color: #fff;
          border: none;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 999;
        }
        /* POPUP WRAPPER */
        .popup {
          position: fixed;
          bottom: 100px; /* just above the floating button */
          right: 30px;
          width: 350px;
          max-width: 90%;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          background-color: #fff;
          display: none; /* hidden by default */
          z-index: 1000;
        }
        .popup.show {
          display: block; /* show when .show is added */
        }
        /* CARD INSIDE POPUP */
        .bland-card {
          overflow: hidden;
          border-radius: 10px;
        }
        /* TOP SECTION */
        .bland-card-header {
          position: relative;
          padding: 16px;
          display: flex;
          align-items: center;
          background-color: #fff;
        }
        .brand-icon {
          width: 50px;
          height: 40px;
          background-color: #9A58E1;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
          margin-bottom: 2px;
        }
        .brand-icon span {
          color: #fff;
          font-weight: 700;
          font-size: 1.2rem;
        }
        .card-texts {
          display: flex;
          flex-direction: column;
        }
        .card-texts h2 {
          font-size: 1.1rem;
          margin-bottom: 4px;
          color: #333;
        }
        .card-texts p {
          font-size: 0.9rem;
          color: #555;
        }
        /* Dynamic time in top-right corner */
        .card-time {
          position: absolute;
          top: 16px;
          right: 16px;
          font-size: 0.9rem;
          color: #333;
        }
        /* BOTTOM SECTION */
        .bland-card-body {
          background-color: #fff;
          padding: 16px;
        }
        /* Styling select element similar to the phone input */
        .agent-select,
        .phone-input {
          width: 100%;
          padding: 12px;
          border: 1px solid #ccc;
          border-radius: 20px;
          margin-bottom: 12px;
          font-size: 1rem;
          outline: none;
        }
        .talk-btn {
          width: 100%;
          padding: 12px;
          background-color: #9A58E1;
          color: #fff;
          border: none;
          border-radius: 20px;
          font-size: 1rem;
          cursor: pointer;
        }
        .talk-btn:hover {
          opacity: 0.9;
        }
      `;
      document.head.appendChild(style);

      // 2. Create the floating call button with phone icon SVG
      const floatingButton = document.createElement("button");
      floatingButton.className = "floating-call-btn";
      floatingButton.id = "togglePopupBtn";
      floatingButton.innerHTML = `
        <svg width="24" height="24" fill="#fff" viewBox="0 0 24 24">
          <path d="M22 16.92v3.09c0 .83-.67 1.5-1.5 1.5C9.4 21.51 
                   2.49 14.6 2.49 3.5 2.49 2.67 3.16 2 3.99 2H7.1c.83 
                   0 1.5.67 1.5 1.5 0 1.32.2 2.59.57 3.8.15.5 0 
                   1.05-.36 1.41l-1.6 1.6c1.34 2.52 3.39 4.57 
                   5.91 5.91l1.6-1.6c.36-.36.91-.51 1.41-.36 
                   1.21.38 2.48.57 3.8.57.83 0 1.5.67 
                   1.5 1.5z"/>
        </svg>
      `;
      document.body.appendChild(floatingButton);

      // 3. Create the popup container and card structure
      const popup = document.createElement("div");
      popup.className = "popup";
      popup.id = "popup";

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
      brandIconSpan.innerHTML = `
        <svg width="24" height="17" fill="#fff" viewBox="0 0 24 24">
          <path d="M22 16.92v3.09c0 .83-.67 1.5-1.5 1.5C9.4 21.51 
                   2.49 14.6 2.49 3.5 2.49 2.67 3.16 2 3.99 2H7.1c.83 
                   0 1.5.67 1.5 1.5 0 1.32.2 2.59.57 3.8.15.5 0 
                   1.05-.36 1.41l-1.6 1.6c1.34 2.52 3.39 4.57 
                   5.91 5.91l1.6-1.6c.36-.36.91-.51 1.41-.36 
                   1.21.38 2.48.57 3.8.57.83 0 1.5.67 
                   1.5 1.5z"/>
        </svg>
      `;
      brandIcon.appendChild(brandIconSpan);
      blandCardHeader.appendChild(brandIcon);

      // Text container for header
      const cardTexts = document.createElement("div");
      cardTexts.className = "card-texts";
      const headerTitle = document.createElement("h2");
      headerTitle.textContent = "Talk With Our AI";
      const headerSub = document.createElement("p");
      headerSub.textContent = "Revolutionize Customer Communication Experience";
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

      // Agent Dropdown (New)
      const agentSelect = document.createElement("select");
      agentSelect.id = "agent_select";
      agentSelect.className = "agent-select";
      agentSelect.innerHTML = '<option value="">Select an Agent</option>';
      blandCardBody.appendChild(agentSelect);

      // Phone Number Input
      const phoneInput = document.createElement("input");
      phoneInput.type = "text";
      phoneInput.className = "phone-input";
      phoneInput.id = "phoneInput";
      phoneInput.placeholder = "Enter Phone Number";
      blandCardBody.appendChild(phoneInput);

      // "Let's Talk" Button
      const talkBtn = document.createElement("button");
      talkBtn.className = "talk-btn";
      talkBtn.id = "talkBtn";
      talkBtn.textContent = "Let's Talk";
      blandCardBody.appendChild(talkBtn);

      // Append popup to body
      document.body.appendChild(popup);

      // 4. Add JavaScript functionality

      // Toggle popup visibility when clicking the floating button
      floatingButton.addEventListener("click", () => {
        popup.classList.toggle("show");
      });

      // Dynamic time update function (12-hour format)
      function updateCardTime() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours || 12;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        cardTime.textContent = hours + ":" + minutes + " " + ampm;
      }
      updateCardTime();

      // Populate agent dropdown by fetching from Flask backend
      fetch("https://mark-cdn.aireceptionistpro.com/get-agent-names")
        .then(response => response.json())
        .then(agents => {
          // Clear the initial option and add agents
          agentSelect.innerHTML = '<option value="">Select an Agent</option>';
          agents.forEach(agent => {
            const option = document.createElement("option");
            option.value = agent.agent_index; // using index as backend identifier
            option.textContent = agent.agent_name || `Agent ${agent.agent_index + 1}`;
            agentSelect.appendChild(option);
          });
        })
        .catch(error => console.error("Error loading agents:", error));

      // Event listener for "Let's Talk" button to send call request
      talkBtn.addEventListener("click", function() {
        const phoneNumber = phoneInput.value.trim();
        const selectedAgentId = agentSelect.value;
        if (!phoneNumber) {
          alert("Please enter a phone number.");
          return;
        }
        if (!selectedAgentId) {
          alert("Please select an agent.");
          return;
        }
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
            alert("Call sent successfully!");
          })
          .catch(err => {
            console.error("Call error:", err);
            alert("Failed to send call.");
          });
      });
    })();
