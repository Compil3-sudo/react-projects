import React, { useState, useRef, useEffect } from 'react'
import { FaBars, FaTwitter } from 'react-icons/fa'
import { links, social } from './data'
import logo from './logo.svg'

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);

  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;

    if (showLinks) {
      // this is inline CSS => it requires this inside the css:
      // .links - container {
      //   height: auto!important;
      // }
      // for when the browser window is less than the min width
      // otherwise it will not work and the height will be set to 0
      // so the links will only be visible on the small screen and not on the big screen
      // links-container has height: 0;
      // so the ul with links needs a parent div

      linksContainerRef.current.style.height = `${linksHeight}px`
    } else {
      linksContainerRef.current.style.height = '0px';
    }
  }, [showLinks])

  return (
    <>
      <nav>
        <div className="nav-center">

          <div className="nav-header">
            <img src={logo} alt="logo" />
            <button className='nav-toggle' onClick={() => setShowLinks(!showLinks)}><FaBars /></button>
          </div>

          {/* this is problematic, because the show-container class in the css has a fixed height =>
         if more links are added, then the height needs to be changed !
        <div className={`${showLinks ? 'links-container show-container' : 'links-container'}`}> */}
          <div className='links-container' ref={linksContainerRef}>
            <ul className="links" ref={linksRef}>
              {links.map(link => {
                const { id, url, text } = link;
                return (
                  <li key={id}>
                    <a href={url}>{text}</a>
                  </li>
                );
              })}
            </ul>
          </div>

          <ul className="social-icons">
            {social.map(socialLink => {
              const { id, url, icon } = socialLink;
              return (
                <li key={id}>
                  <a href={url}>{icon}</a>
                </li>
              );
            })}
          </ul>

        </div>
      </nav >
      <h1>important remember:</h1>
      <ul>
        <li>
          <p>Don't use css class to toggle-show the link container for the small screen like:</p>
          <p>div className=`$showLinks ? 'links-container show-container' : 'links-container'`</p>
          <p>this is problematic, because the show-container class in the css has a fixed height, so
            if more links are added, then the height needs to be changed dynamically !</p>
        </li>
        <li>
          <p>Best approach to useRef and inside the css have a link-container with height: auto!important for the small screen</p>
          <p>The links need to have a container parent div, so that the height will not be 0 for the big screen</p>
        </li>
      </ul>
    </>
  )
}

export default Navbar
