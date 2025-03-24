document.addEventListener("DOMContentLoaded", () => {
  const cosmeticList = document.getElementById("cosmeticList");
  if (!cosmeticList) return; // Don't fetch if container is missing

  fetch("https://makeup-api.herokuapp.com/api/v1/products.json")
    .then(response => response.json())
    .then(data => {
      data.forEach(product => {
        const card = `
          <div class="col-md-4 mb-4">
            <div class="card h-100 shadow-sm">
              <img src="${product.image_link}" class="card-img-top" alt="${product.name}">
              <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description ? product.description.slice(0, 80) + '...' : 'No description available.'}</p>
              </div>
              <div class="card-footer d-flex justify-content-between align-items-center">
                <strong>$${product.price || 'N/A'}</strong>
                <a href="${product.product_link}" target="_blank" class="btn btn-sm btn-primary">Buy</a>
              </div>
            </div>
          </div>
        `;
        cosmeticList.innerHTML += card;
      });
    })
    .catch(error => {
      console.error("Failed to load cosmetics:", error);
      cosmeticList.innerHTML = `<p class="text-danger text-center">Failed to load products.</p>`;
    });
});
