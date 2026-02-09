import React from "react";

const ProductForm = ({ onClose }) => {

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    await fetch("http://127.0.0.1:8000/product", {
      method: "POST",
      body: formData,
    });

    alert("Product saved for outreach training");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xl flex items-center justify-center">
      <div className="w-full max-w-2xl bg-[#0B0D10] border border-white/10 rounded-2xl p-8 relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-white mb-2">Product Form</h2>
        <p className="text-sm text-zinc-400 mb-6">
          This data is used for cold outreach email generation
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input name="product_name" required placeholder="Product Name" className="input" />
          <input name="price" type="number" step="0.01" required placeholder="Price" className="input" />

          <textarea
            name="product_description"
            required
            placeholder="Product description (used in email body)"
            className="input h-28"
          />

          <input name="ideal_customer" placeholder="Ideal customer (e.g. SaaS founders)" className="input" />
          <input name="key_benefit" placeholder="Key benefit (e.g. 3x reply rate)" className="input" />
          <input name="use_case" placeholder="Use case" className="input" />

          <select name="tone" className="input">
            <option>Professional</option>
            <option>Friendly</option>
            <option>Persuasive</option>
            <option>Bold</option>
          </select>

          <button className="w-full py-3 rounded-xl bg-white text-black font-semibold">
            Save Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
