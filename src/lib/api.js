const BASE_URL = "https://api.api-store.workers.dev/api/bazardor";

export async function getProducts(category = "") {
    try {
        const url = category
            ? `${BASE_URL}/products?category=${encodeURIComponent(category)}`
            : `${BASE_URL}/products`;
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch products");
        return await res.json();
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

export async function getProductById(id) {
    try {
        const res = await fetch(`${BASE_URL}/products/${id}`, { cache: "no-store" });
        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        console.error(`Error fetching product ${id}:`, error);
        return null;
    }
}

export async function getCategories() {
    try {
        const res = await fetch(`${BASE_URL}/categories`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch categories");
        return await res.json();
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
}

export async function getCategoryById(categoryId) {
    try {
        const res = await fetch(`${BASE_URL}/categories/${categoryId}`, { cache: "no-store" });
        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        console.error(`Error fetching category ${categoryId}:`, error);
        return null;
    }
}