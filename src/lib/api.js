const BASE_URL = "https://api.api-store.workers.dev/api/bazardor";

export async function getProducts(category = "") {
    try {
        const url = category
            ? `${BASE_URL}/products?category=${encodeURIComponent(category)}`
            : `${BASE_URL}/products`;
        const res = await fetch(url, { next: { revalidate: 60 } });
        if (!res.ok) throw new Error("Failed to fetch products");
        const json = await res.json();
        if (Array.isArray(json)) return json;
        if (Array.isArray(json.data)) return json.data;
        if (Array.isArray(json.products)) return json.products;
        return [];
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

export async function getProductById(id) {
    try {
        const res = await fetch(`${BASE_URL}/products/${id}`, { next: { revalidate: 60 } });
        if (!res.ok) return null;
        const json = await res.json();
        return json.data || json.product || json;
    } catch (error) {
        console.error(`Error fetching product ${id}:`, error);
        return null;
    }
}

export async function getCategories() {
    try {
        const res = await fetch(`${BASE_URL}/categories`, { next: { revalidate: 3600 } });
        if (!res.ok) throw new Error("Failed to fetch categories");
        const json = await res.json();
        if (Array.isArray(json)) return json;
        if (Array.isArray(json.data)) return json.data;
        if (Array.isArray(json.categories)) return json.categories;
        return [];
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
}

export async function getCategoryById(categoryId) {
    try {
        const res = await fetch(`${BASE_URL}/categories/${categoryId}`, { next: { revalidate: 3600 } });
        if (!res.ok) return null;
        const json = await res.json();
        return json.data || json.category || json;
    } catch (error) {
        console.error(`Error fetching category ${categoryId}:`, error);
        return null;
    }
}