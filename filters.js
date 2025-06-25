document.addEventListener('DOMContentLoaded', function() {
    const filterBtn = document.querySelector('.filter-btn');
    
    if(filterBtn) {
        filterBtn.addEventListener('click', function() {
            const category = document.getElementById('category-filter').value;
            const price = document.getElementById('price-filter').value;
            const brand = document.getElementById('brand-filter').value;
            
            filterProducts(category, price, brand);
        });
    }
    
    function filterProducts(category, price, brand) {
        const products = document.querySelectorAll('.product-card');
        
        products.forEach(product => {
            const productCategory = product.dataset.category;
            const productPrice = parseFloat(product.dataset.price);
            const productBrand = product.dataset.brand;
            
            let categoryMatch = category === 'all' || productCategory === category;
            let brandMatch = brand === 'all' || productBrand === brand;
            let priceMatch = true;
            
            if(price !== 'all') {
                const [min, max] = price.split('-').map(Number);
                
                if(price.endsWith('+')) {
                    priceMatch = productPrice >= min;
                } else {
                    priceMatch = productPrice >= min && productPrice <= max;
                }
            }
            
            if(categoryMatch && brandMatch && priceMatch) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }
});