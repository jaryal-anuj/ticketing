import Link from 'next/link';

const Header =({ currentUser })=>{

    const links = [
        !currentUser && { label:'Sign Up', href:'/auth/signup' },
        !currentUser && { label:'Sign In', href:'/auth/signin' },
        currentUser && { label:'Sell Tickets', href:'/tickets/new' },
        currentUser && { label:'My orders', href:'/orders' },
        currentUser && { label:'Sign Out', href:'/auth/signout' }
    ].filter(linkConfig=>linkConfig).map(({label, href})=>{
        return (
            <li key={href} className="nav-item">
                <Link className="nav-link" href={href}>{label}</Link>
            </li>
        );
    });

    return (

            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <Link className="navbar-brand" href="/">GitTix</Link>
                <div className="collapse navbar-collapse justify-content-end">
                    <ul className="navbar-nav">
                        {links}
                    </ul>
                </div>
            </nav>
    
    );
}

export default Header;