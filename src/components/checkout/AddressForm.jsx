import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../context/CheckoutProvider";
import Button from "../common/Button";

export default function AddressForm() {
  const navigate = useNavigate();
  const { product, address, setAddress } = useCheckout();

  const [formData, setFormData] = useState(
    address || {
      fullName: "",
      phoneNumber: "",
      houseNo: "",
      address: "",
      landmark: "",
      city: "",
      state: "",
      pincode: "",
    }
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAddress(formData);
    navigate("/checkout/payment");
  };

  if (!product) {
    return (
      <div className="p-6 text-center text-subtle">
        Preparing address form…
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-heading">Shipping address</h2>
        <p className="text-sm text-subtle">
          We currently deliver PAN India via Bluedart & Delhivery.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <InputField
            label="Full name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <InputField
            label="Phone"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            type="tel"
            required
          />
        </div>

        <InputField
          label="House / Apartment"
          name="houseNo"
          value={formData.houseNo}
          onChange={handleChange}
          placeholder="Flat 101, Building A"
          required
        />

        <div className="grid md:grid-cols-2 gap-4">
          <InputField
            label="Street"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <InputField
            label="Landmark"
            name="landmark"
            value={formData.landmark}
            onChange={handleChange}
            placeholder="Opp. Community Park"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <InputField
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <InputField
            label="State"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
          <InputField
            label="Pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex justify-between pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/checkout/order-summary")}
          >
            Back
          </Button>
          <Button type="submit">Continue to payment</Button>
        </div>
      </form>
    </div>
  );
}

function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
}) {
  return (
    <label className="text-sm font-medium text-subtle block space-y-2">
      <span className="flex items-center gap-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-2xl border border-primary/15 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/40"
      />
    </label>
  );
}
