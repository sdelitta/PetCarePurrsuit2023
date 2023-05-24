import React from 'react';
import '../CSS/Donate.css';


const OrganizationPage = () => {
  return (
    <div className="donate">
        <div style={{height:'8vh'}}></div>
        <div className="donate_container">
            <div className="donate_row">
                <img src={require("../assets/HumaneSociety.png")} alt="Humane Society" className="donate_img" />
                <div className="donate_text_container">
                    <a className="donate_link" href="https://secured.humanesociety.org/page/81880/donate/1?ea.tracking.id=ad_gg_animal_charities&en_txn10=ad_gg_cpc_237076442_17383383962_634206280276_animal%20charities&en_og_source=ad_gg_fndr_81880_hsus&utm_source=google&utm_medium=cpc&utm_term=animal%20charities&gclid=CjwKCAiAlp2fBhBPEiwA2Q10D3p1w_FOP2smkC_-DSkFaW6x1CoJaZO5KYTOiNMPXtX0_4PY8zOvHxoCtVwQAvD_BwE" target="_blank" rel="noopener noreferrer">Donate to the Humane Society</a>
                    <p className="donate_description">The Humane Society of the United States is the nation's largest and most effective animal protection organization.</p>
                </div>
            </div>
            <div className="donate_space"></div>
            <div className="donate_row">
                <img src={require("../assets/ASPCA.png")} alt="ASPCA" className="donate_img" />
                <div className="donate_text_container">
                    <a className="donate_link" href="https://secure.aspca.org/donate/ps-gn-p2?ms=MP_PMK_Googlebrand&initialms=MP_PMK_Googlebrand&pcode=WPSN7GO2PK01&lpcode=WPSN7GO1PK01&test&ds_rl=1066461&gclid=CjwKCAiAlp2fBhBPEiwA2Q10D7qkm8cv2KJAZm3rW9O7iIrcBUP893W--Bxcjur_9e8wzFvsv6376hoC9ZsQAvD_BwE&gclsrc=aw.ds" target="_blank" rel="noopener noreferrer">Donate to the ASPCA</a>
                    <p className="donate_description">The American Society for the Prevention of Cruelty to Animals (ASPCA) is a non-profit organization dedicated to preventing animal cruelty.</p>
                </div>
            </div>
            <div className="donate_row">
                <div className="donate_image" style={{backgroundColor:"white", height:"160px", paddingTop:"40px"}}>
                    <img src={require("../assets/WWF.png")} alt="World Wildlife Fund" className="donate_img" />
                </div>
                <div className="donate_text_container">
                <a className="donate_link" href="https://support.worldwildlife.org/site/Donation2?df_id=11340&11340.donation=form1" target="_blank" rel="noopener noreferrer">Donate to the World Wildlife Fund</a>
                <p className="donate_description">World Wildlife Fund (WWF) works to help local communities conserve the natural resources they depend upon, and protect the world's most important species and natural habitats.</p>
                </div>
            </div>

            {/* International Fund for Animal Welfare */}
            <div className="donate_row">
                <div className="donate_image" style={{backgroundColor:"white", height:"160px", padding:"20px"}}>
                    <img src={require("../assets/IFAW.png")} alt="International Fund for Animal Welfare" className="donate_img" />
                </div>
                <div className="donate_text_container">
                <a className="donate_link" href="https://secure.ifaw.org/united-states/donate" target="_blank" rel="noopener noreferrer">Donate to the International Fund for Animal Welfare</a>
                <p className="donate_description">International Fund for Animal Welfare (IFAW) rescues, rehabilitates, and releases animals into secure habitats around the world, and works on policies to protect animals and their habitats.</p>
                </div>
            </div>

            {/* Animal Welfare Institute */}
            <div className="donate_row">
                <div className="donate_image" style={{backgroundColor:"white", height:"160px", padding:"20px"}}>
                    <img src={require("../assets/AWI.png")} alt="Animal Welfare Institute" className="donate_img" />
                </div>
                <div className="donate_text_container">
                <a className="donate_link" href="https://awionline.org/content/make-donation-awi" target="_blank" rel="noopener noreferrer">Donate to the Animal Welfare Institute</a>
                <p className="donate_description">The Animal Welfare Institute (AWI) is dedicated to reducing animal suffering and promoting the welfare of all animals, including animals in agriculture, laboratories, and the wild.</p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default OrganizationPage;
