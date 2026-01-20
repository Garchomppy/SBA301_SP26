import { Carousel } from "react-bootstrap";
import { bannerData } from "../data/Banner";

export default function AppCarousel() {
  return (
    <Carousel fade interval={3000} className="shadow-lg">
      {bannerData.map((item) => (
        <Carousel.Item key={item.id}>
          <div
            className="position-relative w-100"
            style={{ backgroundColor: "#000" }}
          >
            <img
              className="d-block w-100 opacity-75"
              src={item.image}
              alt={item.title}
              style={{
                objectFit: "fill",
                height: "300px",
              }}
            />
          </div>

          <Carousel.Caption className="d-flex flex-column h-100 align-items-center justify-content-center bottom-0">
            <h1
              className="display-3 fw-bold text-uppercase mb-3"
              style={{ letterSpacing: "2px" }}
            >
              {item.title}
            </h1>
            <p className="fs-4 fw-light mb-4 px-md-5">{item.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
