import { Divider, Button, Icon, Popup } from "semantic-ui-react";
import Link from "next/link";

const Header = ({ text, divider, style, add, back, route }) => {
    return (
        <>
            <h3 style={style} className="header-text-center">
                {text}
                {
                    add
                        ? (
                            <Link href={route}>
                                <a>
                                    <Popup position='left center' content='Add new request' trigger={
                                        <Button floated="right" primary>
                                            <Button.Content visible>
                                                <Icon name='add circle' />
                                            </Button.Content>
                                        </Button>
                                    } />
                                </a>
                            </Link>
                        )
                        : (
                            back
                                ? (
                                    <Link href={route}>
                                        <a>
                                            <Popup position='right center' content='back to requests' trigger={
                                                <Button floated="left" secondary>
                                                    <Button.Content visible>
                                                        <Icon name='arrow alternate circle left' />
                                                    </Button.Content>
                                                </Button>
                                            } />
                                        </a>
                                    </Link>
                                )
                                : null
                        )
                }
            </h3>
            {divider ? <Divider /> : null}
        </>
    );
};

export default Header;