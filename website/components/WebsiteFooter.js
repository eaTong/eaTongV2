import React from 'react';
import PropTypes from 'prop-types';

const WebsiteFooter = (props) => {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          Designed & Powered by <strong> <a href="https://eatong.cn"> eaTong</a></strong>
        </p>
        <p>Copyright©2019 <strong>eaTong</strong> <strong>周夷东</strong></p>
        <p>
          <small>
            备案信息：
            <a href="http://beian.miit.gov.cn/publish/query/indexFirst.action">滇ICP备17010764号-1</a>
          </small>
        </p>
        <p>
          <small>
            外链：
            <a target="_blank" href="https://m.igetget.com/share/invite/buddy/?aid=1&cid=1&uid=JqbdLG459E8W1BKGMmJy0rxl2a3zwv&source=invite">得到推广</a>
            <br></br>
            <a target="_blank" href="https://iget.eatong.cn">书香：记录心灵每一次触动。</a>
          </small>
        </p>
      </div>
    </footer>
  )
};
WebsiteFooter.propTypes = {
  visible: PropTypes.bool
};
export default WebsiteFooter;
