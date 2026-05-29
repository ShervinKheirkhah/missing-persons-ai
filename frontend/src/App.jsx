import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [page, setPage] = useState('home');
  
  const [regForm, setRegForm] = useState({ name: '', status: 'missing', description: '', age: '', height: '', national_code: '', last_location: '', contact_info: '' });
  const [regImage, setRegImage] = useState(null);
  const [regMessage, setRegMessage] = useState('');

  const [searchImage, setSearchImage] = useState(null);
  const [searchFilters, setSearchFilters] = useState({ age: '', height: '', national_code: '', last_location: '' });
  const [searchResults, setSearchResults] = useState([]);
  const [searchMessage, setSearchMessage] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegMessage('در حال ارسال اطلاعات...');
    const formData = new FormData();
    formData.append('image', regImage);
    Object.keys(regForm).forEach(key => {
      if (regForm[key]) formData.append(key, regForm[key]);
    });

    try {
      const res = await axios.post('http://127.0.0.1:8000/register/', formData);
      setRegMessage('✅ ' + res.data.message);
      setRegForm({ name: '', status: 'missing', description: '', age: '', height: '', national_code: '', last_location: '', contact_info: '' });
      setRegImage(null);
      e.target.reset();
    } catch (err) {
      setRegMessage('❌ خطا در ثبت اطلاعات.');
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    setSearchMessage('⏳ در حال جستجو و تحلیل چهره...');
    setSearchResults([]);
    
    const formData = new FormData();
    formData.append('image', searchImage);
    Object.keys(searchFilters).forEach(key => {
      if (searchFilters[key]) formData.append(key, searchFilters[key]);
    });

    try {
      const res = await axios.post('http://127.0.0.1:8000/match-person/', formData);
      setSearchResults(res.data.matches);
      setSearchMessage(res.data.message);
    } catch (err) {
      setSearchMessage('❌ خطا در جستجو.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="app-container" dir="rtl">
      <nav className="navbar glass">
        <div className="nav-brand" onClick={() => setPage('home')}>
          <span className="brand-icon">🔍</span> جستجوگر هوشمند
        </div>
        <div className="nav-links">
          <button className={page === 'home' ? 'active' : ''} onClick={() => setPage('home')}>صفحه اصلی</button>
          <button className={page === 'register' ? 'active' : ''} onClick={() => setPage('register')}>ثبت فرد</button>
          <button className={page === 'search' ? 'active' : ''} onClick={() => setPage('search')}>جستجوی فرد</button>
        </div>
      </nav>

      {page === 'home' && (
        <div className="home-page fade-in">
          <div className="hero-section">
            <h1>کمک به بازگشت عزیزان گمشده</h1>
            <p>هر فرد گمشده، خانواده‌ای دارد که با اشتیاق منتظر بازگشت اوست. با استفاده از پیشرفته‌ترین الگوریتم‌های هوش مصنوعی و تطبیق چهره، ما روند جستجو را سریع‌تر و دقیق‌تر می‌کنیم.</p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => setPage('register')}>ثبت فرد گمشده/پیدا شده</button>
              <button className="btn-secondary" onClick={() => setPage('search')}>جستجو در دیتابیس</button>
            </div>
          </div>
          
          <div className="how-it-works">
            <h2>نحوه کار سامانه</h2>
            <div className="steps">
              <div className="step-card glass fade-in-up" style={{animationDelay: '0.2s'}}>
                <div className="step-icon">📸</div>
                <h3>۱. آپلود عکس</h3>
                <p>یک عکس واضح از فرد گمشده یا پیدا شده بارگذاری کنید.</p>
              </div>
              <div className="step-card glass fade-in-up" style={{animationDelay: '0.4s'}}>
                <div className="step-icon">🤖</div>
                <h3>۲. تحلیل هوش مصنوعی</h3>
                <p>سیستم با استفاده از بینایی ماشین، دیتابیس را برای یافتن شباهت‌های چهره بررسی می‌کند.</p>
              </div>
              <div className="step-card glass fade-in-up" style={{animationDelay: '0.6s'}}>
                <div className="step-icon">🤝</div>
                <h3>۳. اتصال دوباره</h3>
                <p>در صورت تطابق چهره و اطلاعات، خانواده‌ها به هم متصل می‌شوند.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {page === 'register' && (
        <div className="page-content fade-in">
          <div className="form-card glass wide-card">
            <h2>ثبت اطلاعات فرد گمشده یا پیدا شده</h2>
            <p className="form-desc">لطفاً اطلاعات را تا حد امکان دقیق و کامل وارد کنید. در صورت ثبت فرد پیدا شده، حتماً اطلاعات تماس خود را وارد کنید تا خانواده بتوانند با شما تماس بگیرند.</p>
            <form onSubmit={handleRegister}>
              <div className="form-grid">
                <div className="form-group">
                  <label>نام و نام خانوادگی *</label>
                  <input type="text" required onChange={e => setRegForm({...regForm, name: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>وضعیت *</label>
                  <select onChange={e => setRegForm({...regForm, status: e.target.value})}>
                    <option value="missing">گمشده</option>
                    <option value="found">پیدا شده</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>سن (تقریبی)</label>
                  <input type="number" onChange={e => setRegForm({...regForm, age: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>قد</label>
                  <input type="text" placeholder="مثال: ۱۷۵ سانتی‌متر" onChange={e => setRegForm({...regForm, height: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>کد ملی</label>
                  <input type="text" onChange={e => setRegForm({...regForm, national_code: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>آخرین محل مشاهده</label>
                  <input type="text" placeholder="مثال: میدان آزادی" onChange={e => setRegForm({...regForm, last_location: e.target.value})} />
                </div>
              </div>
              
              <div className="form-group full-width">
                <label>اطلاعات تماس (شماره تلفن / آدرس نگهداری) - در صورت پیدا کردن فرد، این بخش الزامی است</label>
                <input type="text" placeholder="مثال: ۰۹۱۲۱۲۳۴۵۶۷ - تحویل داده شده به کلانتری..." onChange={e => setRegForm({...regForm, contact_info: e.target.value})} />
              </div>

              <div className="form-group full-width">
                <label>توضیحات / لباس / نشانه‌های خاص</label>
                <textarea rows="3" onChange={e => setRegForm({...regForm, description: e.target.value})}></textarea>
              </div>

              <div className="form-group full-width upload-section">
                <label>عکس فرد *</label>
                <input type="file" accept="image/*" required onChange={e => setRegImage(e.target.files[0])} />
              </div>

              <button type="submit" className="btn-primary btn-full">ثبت گزارش</button>
              {regMessage && <p className="message">{regMessage}</p>}
            </form>
          </div>
        </div>
      )}

      {page === 'search' && (
        <div className="page-content fade-in">
          <div className="form-card glass wide-card">
            <h2>جستجوی فرد گمشده</h2>
            <p className="form-desc">عکس فرد را بارگذاری کنید تا هوش مصنوعی دیتابیس را بررسی کند.</p>
            <form onSubmit={handleSearch}>
              <div className="form-group full-width upload-section">
                <label>آپلود عکس برای جستجو *</label>
                <input type="file" accept="image/*" required onChange={e => setSearchImage(e.target.files[0])} />
              </div>

              <h3 style={{marginTop: '20px', color: '#fff'}}>فیلترهای اختیاری</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>سن</label>
                  <input type="number" onChange={e => setSearchFilters({...searchFilters, age: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>قد</label>
                  <input type="text" onChange={e => setSearchFilters({...searchFilters, height: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>کد ملی</label>
                  <input type="text" onChange={e => setSearchFilters({...searchFilters, national_code: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>محل</label>
                  <input type="text" onChange={e => setSearchFilters({...searchFilters, last_location: e.target.value})} />
                </div>
              </div>

              <button type="submit" className="btn-primary btn-full" disabled={isSearching}>
                {isSearching ? 'در حال تحلیل چهره‌ها...' : '🔍 شروع جستجوی هوشمند'}
              </button>
            </form>
            
            {searchMessage && <p className="message">{searchMessage}</p>}

            <div className="results-container">
              {searchResults.map(person => (
                <div key={person.id} className="result-card glass fade-in">
                  <div className="result-img-wrapper">
                    <img src={`http://127.0.0.1:8000/${person.image_path}`} alt={person.name} />
                  </div>
                  <div className="result-info">
                    <h3>{person.name} <span className={`status-badge ${person.status}`}>{person.status === 'missing' ? 'گمشده' : 'پیدا شده'}</span></h3>
                    
                    <div className="info-grid">
                      <p><strong>سن:</strong> {person.age || 'نامشخص'}</p>
                      <p><strong>قد:</strong> {person.height || 'نامشخص'}</p>
                      <p><strong>کد ملی:</strong> {person.national_code || 'نامشخص'}</p>
                      <p><strong>محل مشاهده:</strong> {person.last_location || 'نامشخص'}</p>
                    </div>

                    <p className="desc"><strong>توضیحات:</strong> {person.description || 'بدون توضیحات'}</p>

                    {/* IMPORTANT: Contact Info Section */}
                    {person.contact_info && (
                      <div className="contact-box">
                        <strong>📞 اطلاعات تماس / محل نگهداری:</strong> 
                        <span>{person.contact_info}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <footer className="footer glass">
        <p>© ۱۴۰۵ سامانه هوشمند جستجوی افراد گمشده. طراحی شده با ❤️ برای کمک به جامعه.</p>
      </footer>
    </div>
  );
}

export default App;
