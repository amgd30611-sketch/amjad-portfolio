"use client";
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'تطوير موقع ويب',
    details: ''
  });

  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('جاري معالجة طلبك الفاخر...');

    try {
      // التأكد من إرسال البيانات بشكل واضح ومفصل لـ Supabase
      const { error } = await supabase
        .from('orders')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            service: formData.service, // هنا نضمن إرسال القيمة المحدثة بدقة
            details: formData.details
          }
        ]);

      if (error) throw error;

      setStatus('تم استلام طلبك بنجاح! سأتواصل معك قريباً.');
      setFormData({ name: '', email: '', phone: '', service: 'تطوير موقع ويب', details: '' });
    } catch (error) {
      console.error(error);
      setStatus('حدث خطأ غير متوقع، يرجى المحاولة لاحقاً');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-[#1a1a1a] p-4 md:p-12 flex flex-col items-center justify-center font-sans antialiased">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Reem+Kufi:wght@700&family=Cairo:wght@400;600&display=swap');
      
        .font-main-title {
            font-family: 'Reem Kufi', sans-serif;
            font-size: 4rem;
            @media (min-width: 768px) {
                font-size: 6rem;
            }
        }
        .font-body { font-family: 'Cairo', sans-serif; }
      `}</style>

      <div className="w-full max-w-4xl text-center mb-12">
        <h1 className="font-main-title mb-6 bg-gradient-to-r from-amber-500 to-amber-800 bg-clip-text text-transparent drop-shadow-md">
          اطلب مشروعك
        </h1>
        <p className="font-body text-gray-600 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
          نحن هنا لتحويل طموحاتك الرقمية إلى واقع مبهر.
          لا تتردد في طلب خدمتك التقنية الاحترافية الآن، دعنا نتولى التفاصيل لنقدم لك حلاً ذهبياً يتجاوز توقعاتك ويرسخ مكانتك في السوق.
        </p>
      </div>

      <div className="w-full max-w-xl bg-white border border-gray-100 p-8 md:p-10 rounded-[2.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.06)]">
      
        <form onSubmit={handleSubmit} className="font-body space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 mr-1 text-right">الاسم الكامل</label>
            <input
              type="text"
              required
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-right"
              placeholder="مثلاً: أمجد ..."
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 mr-1 text-right">البريد الإلكتروني</label>
              <input
                type="email"
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-amber-500 transition-all text-right"
                placeholder="email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 mr-1 text-right">رقم الهاتف</label>
              <input
                type="tel"
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-amber-500 transition-all text-left"
                placeholder="+967"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 mr-1 text-right">نوع الخدمة</label>
            {/* إضافة اسم للحقل name="service" لضمان قراءة المتصفحات له بشكل رسمي وتجنب الكاش القديم */}
            <select
              name="service"
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-amber-500 transition-all text-right appearance-none font-body"
              value={formData.service}
              onChange={(e) => setFormData({...formData, service: e.target.value})}
            >
              <option value="تطوير موقع ويب">تطوير موقع ويب</option>
              <option value="تطبيق موبايل">تطبيق موبايل</option>
              <option value="بناء قواعد بيانات">بناء قواعد بيانات</option>
              <option value="عرض تقديمي">عرض تقديمي</option>
              <option value="بحوث علمية">بحوث علمية</option>
              <option value="بحوث تخرج">بحوث تخرج</option>
              <option value="حملات إعلانية">حملات إعلانية</option>
              <option value="تصميم شعارات">تصميم شعارات</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 mr-1 text-right">تفاصيل المشروع</label>
            <textarea
              required
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-amber-500 h-32 transition-all text-right"
              placeholder="اشرح لي فكرة مشروعك باختصار وبكل وضوح..."
              value={formData.details}
              onChange={(e) => setFormData({...formData, details: e.target.value})}
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#c59d5f] hover:bg-[#b38b4d] py-5 rounded-2xl font-bold text-white text-xl shadow-lg shadow-amber-200 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? 'جاري الإرسال...' : 'إرسال الطلب الآن'}
          </button>
        
          {status && (
            <div className="mt-4 text-center font-bold text-amber-700">
              {status}
            </div>
          )}
        </form>
      </div>
    
      <p className="font-body mt-10 text-gray-400 text-sm">Amjad Portfolio © 2026</p>
    </div>
  );
}