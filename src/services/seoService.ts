import { 
  db, 
  handleFirestoreError, 
  OperationType 
} from '../lib/firebase';
import { 
  collection, 
  addDoc, 
  doc, 
  setDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit, 
  serverTimestamp,
  getDoc
} from 'firebase/firestore';

export interface SeoReportData {
  website: string;
  audit: {
    overall_seo_score: number;
    seo_grade: string;
    lost_revenue: number;
    weaknesses: string[];
    warnings: string[];
  };
  on_page: {
    title: string;
    meta_description: string;
    h1_count: number;
    h2_count: number;
    images_total: number;
    images_missing_alt: number;
    ssl: boolean;
    structured_data: boolean;
  };
  pagespeed: {
    mobile_performance: number;
    mobile_seo: number;
    desktop_performance: number;
    desktop_seo: number;
  };
  indexation: {
    total_indexed_pages: number;
  };
  recommendations: {
    priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
    action: string;
    impact: string;
  }[];
}

/**
 * Stores SEO report data from API into Firestore
 */
export async function storeSeoReport(userId: string, data: SeoReportData) {
  try {
    // 1. Create main report doc
    const reportRef = await addDoc(collection(db, 'seo_reports'), {
      userId,
      website: data.website,
      createdAt: serverTimestamp()
    });

    const reportId = reportRef.id;

    // 2. Store subcollections
    // Using 'data' as doc ID for single-doc subcollections for easier retrieval
    await setDoc(doc(db, 'seo_reports', reportId, 'audit', 'data'), data.audit);
    await setDoc(doc(db, 'seo_reports', reportId, 'on_page', 'data'), data.on_page);
    await setDoc(doc(db, 'seo_reports', reportId, 'pagespeed', 'data'), data.pagespeed);
    await setDoc(doc(db, 'seo_reports', reportId, 'indexation', 'data'), data.indexation);

    // Recommendations as multiple docs
    const recsCol = collection(db, 'seo_reports', reportId, 'recommendations');
    for (const rec of data.recommendations) {
      await addDoc(recsCol, rec);
    }

    return reportId;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'seo_reports');
    throw error;
  }
}

/**
 * Fetches the latest SEO report for a user
 */
export async function fetchLatestSeoReport(userId: string) {
  try {
    const q = query(
      collection(db, 'seo_reports'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(1)
    );

    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;

    const reportDoc = snapshot.docs[0];
    const reportId = reportDoc.id;
    const reportBase = reportDoc.data();

    // Fetch subcollections
    const auditSnap = await getDoc(doc(db, 'seo_reports', reportId, 'audit', 'data'));
    const onPageSnap = await getDoc(doc(db, 'seo_reports', reportId, 'on_page', 'data'));
    const pageSpeedSnap = await getDoc(doc(db, 'seo_reports', reportId, 'pagespeed', 'data'));
    const indexationSnap = await getDoc(doc(db, 'seo_reports', reportId, 'indexation', 'data'));
    const recsSnap = await getDocs(collection(db, 'seo_reports', reportId, 'recommendations'));

    return {
      id: reportId,
      ...reportBase,
      audit: auditSnap.data(),
      on_page: onPageSnap.data(),
      pagespeed: pageSpeedSnap.data(),
      indexation: indexationSnap.data(),
      recommendations: recsSnap.docs.map(d => ({ id: d.id, ...d.data() }))
    };
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'seo_reports');
    throw error;
  }
}
