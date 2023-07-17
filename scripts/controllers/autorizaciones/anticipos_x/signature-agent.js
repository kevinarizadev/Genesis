const SignatureAgent = (() => {
  document.body.insertAdjacentHTML('beforeend', `<div id="signatureModal" class="sa-modal" >
  <div class="sa-modal-content">
      <span class="signatureModalClose">&times;</span>
      <h3>Recolección de Firma</h3>
      <div class="status">
          <div class="status-icon">
              <i class="fas fa-spinner fa-3x fa-pulse" id="agent-status-icon"></i>
          </div>
          <div class="status-text">
              <p id="agent-status"></p>
          </div>
      </div>
  </div>
</div>`)


  const modal = document.getElementById("signatureModal");
  const closeButton = document.getElementsByClassName("signatureModalClose")[0];
  // modal.preventDefault();
  const agentStatusElement = document.querySelector('#agent-status');
  const agentStatusIconElement = document.querySelector('#agent-status-icon');


  const showOnStartingMessage = function () {
    agentStatusElement.innerHTML = "Verificando disponilidad del servicio";
    agentStatusIconElement.classList = [];
    agentStatusIconElement.classList.add('fas');
    agentStatusIconElement.classList.add('fa-spinner');
    agentStatusIconElement.classList.add('fa-3x');
    agentStatusIconElement.classList.add('fa-pulse');
  }

  const showOnErrorMessage = function () {
    agentStatusElement.innerHTML = "Por favor inicie el agente de recolección de firmas.";
    agentStatusIconElement.classList = [];
    agentStatusIconElement.classList.add('fas');
    agentStatusIconElement.classList.add('fa-times');
    agentStatusIconElement.classList.add('fa-3x');
    // console.log("Error");
    return 0
  };

  const showOnCancelledMessage = function () {
    agentStatusElement.innerHTML = "Se ha cancelado la recolección de la firma.";
    agentStatusIconElement.classList = [];
    agentStatusIconElement.classList.add('fas');
    agentStatusIconElement.classList.add('fa-times');
    agentStatusIconElement.classList.add('fa-3x');
  };

  const showOnSuccessMessage = function () {
    agentStatusElement.innerHTML = "Recolección de firma exitosa";
    agentStatusIconElement.classList = [];
    agentStatusIconElement.classList.add('fas');
    agentStatusIconElement.classList.add('fa-check');
    agentStatusIconElement.classList.add('fa-3x');
  };

  const showOnSigningMessage = function () {
    agentStatusElement.innerHTML = "Iniciando la recolección de la firma";
    agentStatusIconElement.classList = [];
    agentStatusIconElement.classList.add('fas');
    agentStatusIconElement.classList.add('fa-spinner');
    agentStatusIconElement.classList.add('fa-3x');
    agentStatusIconElement.classList.add('fa-pulse');
  };

  const startService = function (name) {
    return new Promise((resolve, reject) => {
      const websocket = new WebSocket('ws://localhost:8549');


      websocket.onopen = function () {

        setTimeout(() => {
          websocket.send(`{"event":"get_signature", data: "${name}"}`)
          showOnSigningMessage()
        }, 3000);
      }

      websocket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        if (typeof data.event === 'undefined' || typeof data.success === 'undefined') {
          reject('invalid signature response')
        } else {
          switch (data.event) {
            case 'signature':
              if (data.success === true) {
                showOnSuccessMessage()
                setTimeout(() => {                  
                  SignatureAgent.closeModal()
                  resolve(data.data)
                }, 3000)
              } else {
                if (typeof data.error === 'undefined') {
                  reject('invalid signature response')
                } else {
                  if (data.error === 'cancelled') {
                    showOnCancelledMessage()
                    setTimeout(() => {                      
                      SignatureAgent.closeModal()
                      reject('cancelled')
                    }, 5000)
                  } else {
                    SignatureAgent.closeModal()
                    reject(data.error)
                  }
                }
              }
              break
            default:
              SignatureAgent.closeModal()
              reject('unknown event')
          }
        }
      }

      websocket.onclose = function () {
        showOnErrorMessage();
      }

      websocket.onerror = function () {
        showOnErrorMessage();
      }
    })
  }

  window.onclick = function (event) {
    if (event.target == modal) {
      SignatureAgent.closeModal();
    }
  }

  closeButton.addEventListener('click', () => {
    SignatureAgent.closeModal();
  });

  return {
    openModal: (name) => {
      modal.style.display = "block";
      showOnStartingMessage();
      return startService(name);
    },

    closeModal: () => {
      modal.style.display = "none";
    }
  };
})();
