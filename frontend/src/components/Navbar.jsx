import { Link, NavLink } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useState } from "react";

import { useAuth } from "../context/AuthContext";


function Navbar({ darkMode, setDarkMode }) {


const [menuOpen,setMenuOpen]=useState(false);


const {user,logout,token}=useAuth();



const links=[


{
name:"Home",
path:"/"
},


{
name:"About",
path:"/about"
},


{
name:"Generate",
path:"/generate"
},


{
name:"Dashboard",
path:"/dashboard"
},


];





return (

<header className="sticky top-0 z-50 bg-[#2E7D32] shadow-lg">


<div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">



<Link

to="/"

className="text-3xl font-bold text-white tracking-wide"

>

Product Description AI

</Link>





<nav className="hidden md:flex items-center gap-8">



{
links.map((item)=>(


<NavLink

key={item.name}

to={item.path}

className={({isActive})=>

`transition font-medium ${
isActive

?

"text-white border-b-2 border-white pb-1"

:

"text-green-100 hover:text-white"

}`

}

>


{item.name}


</NavLink>


))
}







{
token && user && (

<span className="text-white font-semibold">

Hi, {user.name}

</span>

)

}





{
token ? (

<button

onClick={logout}

className="text-white hover:text-red-200 font-medium"

>

Logout

</button>


)

:

(

<NavLink

to="/login"

className="text-green-100 hover:text-white font-medium"

>

Login

</NavLink>


)

}







<button

onClick={()=>setDarkMode(!darkMode)}

className="bg-white/20 hover:bg-white/30 transition rounded-full p-2"

>


{

darkMode

?

<Sun className="text-yellow-300"/>

:

<Moon className="text-white"/>

}


</button>



</nav>








<button

onClick={()=>setMenuOpen(!menuOpen)}

className="md:hidden text-white"

>


{
menuOpen

?

<X size={28}/>

:

<Menu size={28}/>

}


</button>



</div>





{
menuOpen && (


<div className="md:hidden bg-[#2E7D32]">


{

links.map((item)=>(


<NavLink

key={item.name}

to={item.path}

onClick={()=>setMenuOpen(false)}

className="block px-6 py-4 text-green-100 hover:bg-green-700"

>


{item.name}


</NavLink>


))

}



{
token &&

<button

onClick={logout}

className="block px-6 py-4 text-white"

>

Logout

</button>

}


</div>


)

}



</header>

);

}


export default Navbar;