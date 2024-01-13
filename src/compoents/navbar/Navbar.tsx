import React from 'react';
import {SiCoffeescript} from 'react-icons/si';
import {Link} from 'react-scroll';


const Navbar = () => {
    return (
        <div className={''}>
            <div>
                <div>
                    <div>
            <span>
              <SiCoffeescript/>
            </span>
                        <h1>Coffee With Me</h1>
                    </div>
                    <nav>
                        <Link to="home" spy={true} smooth={true} duration={500} className={'cursor-pointer'}>
                            Home
                        </Link>
                        <Link to="menu" spy={true} smooth={true} duration={500} className={'cursor-pointer'}>
                            Menu
                        </Link>
                        <Link to="about" spy={true} smooth={true} duration={500} className={'cursor-pointer'}>
                            About Us
                        </Link>
                        <Link to="prdoucts" spy={true} smooth={true} duration={500} className={'cursor-pointer'}>
                            Products
                        </Link>
                        <Link to="review" spy={true} smooth={true} duration={500} className={'cursor-pointer'}>
                            Reviews
                        </Link>
                    </nav>
                    <div>
                        <button>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;


// import React from 'react';
// import { SiCoffeescript } from 'react-icons/si';
//
// const Navbar = () => {
//     return (
//         <div className={''}>
//             <div>
//                 <div>
//                     <div>
//                         <span>
//                             <SiCoffeescript/>
//                         </span>
//                         <h1>Coffee With Me</h1>
//                     </div>
//                     <nav>
//                         <a href="#home" className={'cursor-pointer'}>
//                             Home
//                         </a>
//                         <a href="#menu" className={'cursor-pointer'}>
//                             Menu
//                         </a>
//                         <a href="#about" className={'cursor-pointer'}>
//                             About Us
//                         </a>
//                         <a href="#products" className={'cursor-pointer'}>
//                             Products
//                         </a>
//                         <a href="#review" className={'cursor-pointer'}>
//                             Reviews
//                         </a>
//                     </nav>
//                     <div>
//                         <button>
//                             Login
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default Navbar;
