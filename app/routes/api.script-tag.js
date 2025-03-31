export function loader({ request }) {
    return new Response(
      `
      (function() {
        fetch('${new URL(request.url).origin}/api/get-note')
          .then(response => response.json())
          .then(data => {
            if (data.note) {
              if (window.location.pathname.includes('/products/')) {
                const noteElement = document.createElement('div');
                noteElement.style.padding = '15px';
                noteElement.style.margin = '15px 0';
                noteElement.style.backgroundColor = '#f9f9f9';
                noteElement.style.border = '1px solid #e8e8e8';
                noteElement.innerHTML = data.note;
                
                const productTitle = document.querySelector('h1');
                if (productTitle) {
                  productTitle.parentNode.insertBefore(noteElement, productTitle.nextSibling);
                }
              }
            }
          })
          .catch(error => console.error('Error loading note:', error));
      })();
      `,
      {
        headers: {
          "Content-Type": "application/javascript",
        },
      }
    );
  }