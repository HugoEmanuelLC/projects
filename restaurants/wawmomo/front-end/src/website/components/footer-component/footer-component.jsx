


function FooterComponent() {
    return (
        <footer id="footer_component">
            <div className="box_adresse_links">
                <div className="adresse">
                    <p>Adresse:</p>
                    <p>Av. Raymond Brassinne 18</p>
                    <p>1420 Braine-l'Alleud</p>
                    <p>Belgique</p>
                </div>

                <ul>
                    <li>
                        <a href="https://www.facebook.com/people/WAW-MOMO-Braine-LAlleud/100063606097301/" target="_blank">
                        <i className='bx bxl-facebook-square'></i>
                            &nbsp;Facebook
                        </a>
                    </li>

                    <li>
                        <a href="mailto:info@wawmomo.be">
                            <i className='bx bxs-envelope' ></i>
                            &nbsp;info@wawmomo.be
                        </a>
                    </li>

                    <li>
                        <a href="tel:02.203.43.00">
                            <i className='bx bxs-phone'></i>
                            &nbsp;02.203.43.00
                        </a>
                    </li>

                    <li>
                        <a href="https://www.ubereats.com/be/store/waw-momo/cSUvNUqGX5Kl3r0X5ZDNEg">
                            <i className='bx bxs-package' ></i>
                            &nbsp;Livraison
                        </a>
                    </li>
                </ul>
            </div>
            
            <p className="copyright">2025 <span>©</span> Créer par <a href="https://www.clavinas.com" target="_blank" rel="noopener noreferrer">clavinas.com</a></p>
        </footer>
    )
}

export default FooterComponent;