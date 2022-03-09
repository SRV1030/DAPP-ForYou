import { Menu } from "semantic-ui-react";

import Link from 'next/link';

const HeaderNav = () => {
    return (
        <Menu style={{ marginTop: '10px' }}>
            <Link  href="/">
                <a className="item">ForYou</a>
            </Link>

            <Menu.Menu position='right'>
                <Link  href="/">
                    <a className="item">Campaigns</a>
                </Link>

                <Link  href="/campaign/new">
                    <a className="item">+</a>
                </Link>
            </Menu.Menu>
        </Menu>
    )
}

export default HeaderNav;