import logo from "../../../assets/Logo/Logo.png";
import facebook from '../../../assets/social icons/002-facebook.png'
import linkedin from '../../../assets/social icons/003-linkedin.png'
import instagram from '../../../assets/social icons/004-instagram.png'
import github from '../../../assets/social icons/001-github.png'

const Footer = () => {
  return (
    <div className="">
      <footer className="footer p-10 bg-base-200 ">
        <aside>
          <img className="h-[120px]" src={logo} alt="" />
          <p className="text-sm">
            Pandas MarketPlace.
            <br />
            Providing reliable services since 2024
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="grid grid-flow-col gap-4">
            <a
              href="https://www.facebook.com/habibb2r"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={facebook} alt="" />
            </a>
            <a
              href="https://www.linkedin.com/in/habibb2r"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedin} alt="" />
            </a>
            <a
              href="https://www.instagram.com/habibb2r"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={instagram} alt="" />
            </a>
            <a
              href="https://github.com/habibb2r"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={github} alt="" />
            </a>
          </div>
        </nav>
      </footer>
      <footer className="footer footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by <span className="font-bold" >Habibb2r</span>
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
