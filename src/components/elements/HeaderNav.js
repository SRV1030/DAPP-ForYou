import { Menu } from "semantic-ui-react";

const HeaderNav = () => {
    return (
        <Menu style={{marginTop: '10px'}}>
            <Menu.Item>
                ForYou
            </Menu.Item>

            <Menu.Menu position='right'>
                <Menu.Item>
                    Campaigns
                </Menu.Item>

                <Menu.Item>
                   +
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    )
}

export default HeaderNav;