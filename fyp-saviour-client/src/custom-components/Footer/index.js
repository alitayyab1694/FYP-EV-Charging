import React from 'react';
import Styled from 'styled-components';

const Footer = () => {
  return (
    <footer class="ng-scope">
      <div class="copy" bis_skin_checked="1">
        © 2021 Recargo, Inc. <span class="rights">All rights reserved.</span>
      </div>
      <div class="resource" bis_skin_checked="1">
        <a href="https://company.plugshare.com/privacy.html" target="_blank">
          Privacy
        </a>
      </div>
      <div class="resource" bis_skin_checked="1">
        <a href="https://company.plugshare.com/terms.html" target="_blank">
          Terms of Use
        </a>
      </div>
      <div class="resource developer" bis_skin_checked="1">
        <a href="https://developer.plugshare.com/" target="_blank">
          Developers
        </a>
      </div>
      <div class="resource stats" bis_skin_checked="1">
        <a href="https://www.plugshare.com/directory/us" target="_blank">
          Stats
        </a>
      </div>
      <div class="resource faq" bis_skin_checked="1">
        <a
          href="https://recargo.freshdesk.com/support/solutions/folders/29000042639"
          target="_blank">
          FAQ
        </a>
      </div>
    </footer>
  );
};

export default Styled(Footer)`

footer {
    width: 100%;
    height: 25px;
    background-color: #ddd;
    text-align: center;
    font-weight: 300;
    font-size: 12px;
}
`;
