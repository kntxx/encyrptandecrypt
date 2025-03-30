document.addEventListener("DOMContentLoaded", function () {
  // Tab functionality
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons and contents
      tabBtns.forEach((b) => b.classList.remove("active"));
      tabContents.forEach((c) => c.classList.remove("active"));

      // Add active class to clicked button and corresponding content
      btn.classList.add("active");
      const tabId = btn.getAttribute("data-tab") + "-tab";
      document.getElementById(tabId).classList.add("active");
    });
  });

  // Encryption/Decryption functionality
  const encryptBtn = document.getElementById("encryptBtn");
  const decryptBtn = document.getElementById("decryptBtn");
  const clearBtn = document.getElementById("clearBtn");
  const textInput = document.getElementById("textInput");
  const shiftInput = document.getElementById("shiftInput");
  const resultOutput = document.getElementById("resultOutput");

  function encrypt(text, shift) {
    let result = "";

    for (let i = 0; i < text.length; i++) {
      let char = text[i];

      if (char.match(/[a-z]/i)) {
        let code = char.charCodeAt(0);
        let shiftAmount = shift % 26;

        if (code >= 65 && code <= 90) {
          // Uppercase letters
          char = String.fromCharCode(((code - 65 + shiftAmount) % 26) + 65);
        } else if (code >= 97 && code <= 122) {
          // Lowercase letters
          char = String.fromCharCode(((code - 97 + shiftAmount) % 26) + 97);
        }
      }
      result += char;
    }
    return result;
  }

  function decrypt(text, shift) {
    return encrypt(text, 26 - (shift % 26)); // Decryption is inverse of encryption
  }

  encryptBtn.addEventListener("click", () => {
    const text = textInput.value;
    const shift = parseInt(shiftInput.value);

    if (!text) {
      alert("Please enter some text to encrypt");
      return;
    }

    if (isNaN(shift)) {
      alert("Please enter a valid shift value");
      return;
    }

    resultOutput.textContent = encrypt(text, shift);
  });

  decryptBtn.addEventListener("click", () => {
    const text = textInput.value;
    const shift = parseInt(shiftInput.value);

    if (!text) {
      alert("Please enter some text to decrypt");
      return;
    }

    if (isNaN(shift)) {
      alert("Please enter a valid shift value");
      return;
    }

    resultOutput.textContent = decrypt(text, shift);
  });

  clearBtn.addEventListener("click", () => {
    textInput.value = "";
    resultOutput.textContent = "";
  });
});
