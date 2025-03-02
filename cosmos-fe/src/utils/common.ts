export const errorToastStyles = {
    style: { borderRadius: "10px", background: "#840600", color: "#fff" }
}
export const successToastStyles = {
    style: { borderRadius: "10px", background: "#1d8400", color: "#fff" }
}

export const productPageBackground ={
    backgroundImage: `linear-gradient(
      45deg,
      hsl(240, 100%, 20%) 0%,
      hsl(37, 100%, 50%) 19%,
      hsl(0, 100%, 68%) 37%,
      hsl(17, 100%, 54%) 56%,
      hsl(144, 100%, 44%) 77%,
      hsl(176, 100%, 50%) 100%
    )`
}

export const getSeverity = (product: any) => {
    switch (product.status) {
      case "SHIPPING":
        return "info";

      case "DELIVERED":
        return "success";

      case "CANCELLED":
        return "danger";

      case "PENDING":
        return "warning";

      default:
        return "info";
    }
  };