import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Blog, CreateBlogInput } from "@/types/blog";

const API_BASE = "http://localhost:3001";

// Mock data for demo purposes when API is unavailable
const MOCK_BLOGS: Blog[] = [
  {
    id: 1,
    title: "The Future of Fintech in 2024",
    category: ["FINANCE", "TECH"],
    description: "Exploring how AI and blockchain are reshaping financial services and what it means for the modern accountant.",
    date: "2026-01-11T09:12:45.120Z",
    coverImage: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800",
    content: "The intersection of finance and technology has never been more vibrant. As we look towards 2024, the role of the Chartered Accountant is evolving from mere bookkeeping to strategic financial analysis powered by AI.\n\nAutomation is no longer a buzzword; it's a reality. Routine tasks like data entry, reconciliation, and payroll processing are being automated at an unprecedented pace. This shift allows finance professionals to focus on high-value activities such as strategic financial planning and analysis (FP&A), risk management and compliance auditing, and advisory services for business growth and sustainability.\n\nBlockchain technology is quietly revolutionizing auditing. The immutable ledger provides a 'single source of truth' that could potentially eliminate the need for sampling in audits, allowing for 100% verification of transactions.\n\nTo stay relevant, CAs must upskill. Understanding Python for data analysis, mastering visualization tools like Power BI, and getting comfortable with AI-driven ERP systems are now essential skills. The traditional syllabus provides the foundation, but continuous learning builds the career."
  },
  {
    id: 2,
    title: "Understanding Tax Reforms",
    category: ["FINANCE"],
    description: "A comprehensive breakdown of the new tax laws introduced this fiscal year and their impact on businesses.",
    date: "2026-01-10T14:30:00.000Z",
    coverImage: "https://images.pexels.com/photos/53621/calculator-calculation-insurance-finance-53621.jpeg?auto=compress&cs=tinysrgb&w=800",
    content: "The new tax reforms introduced this fiscal year bring significant changes that every business owner and finance professional needs to understand.\n\nKey highlights include revised tax slabs for individuals and corporations, new deductions for green investments and sustainability initiatives, simplified compliance procedures for small businesses, and enhanced digital filing requirements.\n\nFor businesses, the most impactful change is the revised corporate tax structure. Companies with turnover under 50 crores now benefit from a reduced rate of 22%, while larger corporations see adjustments in surcharge calculations.\n\nThe reforms also introduce a streamlined GST return filing process, reducing the compliance burden significantly. Monthly returns are now consolidated, and the input tax credit mechanism has been simplified.\n\nProfessionals should note the increased scrutiny on high-value transactions and the new reporting requirements for cryptocurrency holdings. Staying compliant requires proactive planning and regular consultation with tax experts."
  },
  {
    id: 3,
    title: "The Art of Slow Travel",
    category: ["TRAVEL", "LIFESTYLE"],
    description: "Discovering the beauty of taking your time and immersing yourself in local cultures instead of rushing through destinations.",
    date: "2026-01-15T08:00:00.000Z",
    coverImage: "https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=800",
    content: "In a world obsessed with bucket lists and Instagram-worthy moments, slow travel offers a refreshing alternative. It's about depth over breadth, experience over efficiency.\n\nSlow travel means spending weeks instead of days in a destination. It means renting an apartment instead of hopping between hotels. It means shopping at local markets, learning a few phrases of the local language, and building relationships with the people you meet.\n\nThe benefits extend beyond just a more relaxed vacation. Slow travel is more sustainable, reducing your carbon footprint by minimizing flights and supporting local economies directly. It's also more economical in many ways – long-term rentals are cheaper than hotels, and cooking your own meals costs less than eating out every day.\n\nMost importantly, slow travel transforms you. When you stay long enough to see the same barista every morning, to recognize the rhythm of a neighborhood, you become more than a tourist. You become a temporary local, and that perspective changes how you see both the world and yourself."
  },
  {
    id: 4,
    title: "Mastering Fermentation at Home",
    category: ["FOOD", "HEALTH"],
    description: "A beginner's guide to creating your own fermented foods—from kimchi to kombucha—in your kitchen.",
    date: "2026-01-14T11:20:00.000Z",
    coverImage: "https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=800",
    content: "Fermentation is one of humanity's oldest food preservation techniques, and it's experiencing a well-deserved renaissance. From gut-healthy sauerkraut to probiotic-rich kombucha, fermented foods offer both incredible flavors and significant health benefits.\n\nGetting started is simpler than you might think. For your first project, try making a basic vegetable ferment. All you need is fresh vegetables, salt, water, and a clean jar. The process is straightforward: chop your vegetables, dissolve salt in water to create a brine, pack the vegetables into a jar, cover with brine, and wait.\n\nThe magic happens as naturally occurring lactobacillus bacteria convert sugars into lactic acid, preserving the vegetables and creating that distinctive tangy flavor. Temperature matters – aim for 65-75°F for most ferments. Too cold and the process stalls; too warm and you risk off-flavors.\n\nOnce you've mastered basic vegetable ferments, you can explore more complex projects like sourdough bread, miso, or even your own hot sauce. The key is patience and observation – fermentation is a living process, and learning to read the signs of healthy fermentation is part of the journey."
  },
  {
    id: 5,
    title: "Soft Skills for Auditors",
    category: ["FINANCE", "LIFESTYLE"],
    description: "Why technical knowledge alone isn't enough—the communication and leadership skills every auditor needs.",
    date: "2026-01-08T16:45:00.000Z",
    coverImage: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
    content: "Technical proficiency in auditing standards and accounting principles is essential, but it's increasingly not enough. The most successful auditors combine their technical skills with strong soft skills that enable them to navigate complex professional relationships.\n\nCommunication tops the list. Auditors must explain complex findings to clients who may not have financial backgrounds. The ability to distill technical issues into clear, actionable insights is invaluable. This includes both written communication in reports and verbal communication in meetings.\n\nCritical thinking and professional skepticism go hand in hand. While questioning everything might seem adversarial, the best auditors approach their work with curiosity rather than suspicion. They ask probing questions in a way that builds trust rather than erodes it.\n\nLeadership skills become crucial as auditors progress in their careers. Managing audit teams, mentoring junior staff, and coordinating with multiple stakeholders requires emotional intelligence and the ability to motivate others.\n\nFinally, adaptability has never been more important. The audit profession is evolving rapidly with technology, and professionals who embrace change rather than resist it will thrive."
  },
  {
    id: 6,
    title: "The Psychology of Color in Design",
    category: ["TECH", "LIFESTYLE"],
    description: "How colors influence our emotions and behaviors, and what this means for creating effective user interfaces.",
    date: "2026-01-12T13:00:00.000Z",
    coverImage: "https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=800",
    content: "Color is more than aesthetic—it's a powerful communication tool that can influence user behavior and emotional responses. Understanding color psychology is essential for anyone designing digital experiences.\n\nBlue conveys trust and professionalism, which is why it dominates financial and healthcare interfaces. Green suggests growth, health, and environmental consciousness. Red creates urgency and draws attention, making it perfect for call-to-action buttons and error states.\n\nBut context matters enormously. Cultural associations with colors vary widely—white symbolizes purity in Western cultures but mourning in some Eastern cultures. Industry conventions also play a role; users expect certain color patterns in specific contexts.\n\nContrast and accessibility should never be sacrificed for aesthetic preferences. The WCAG guidelines require a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text. Tools like WebAIM's contrast checker make it easy to verify your color choices meet accessibility standards.\n\nWhen building a color palette, start with your primary brand color, then select complementary colors that provide sufficient contrast. Limit your palette to 3-5 colors to maintain visual coherence, and always test your designs with actual users to see how they respond."
  }
];

async function fetchBlogs(): Promise<Blog[]> {
  try {
    const response = await fetch(`${API_BASE}/blogs`);
    if (!response.ok) {
      throw new Error("Failed to fetch blogs");
    }
    return response.json();
  } catch {
    // Return mock data when API is unavailable
    console.info("API unavailable, using mock data");
    return MOCK_BLOGS;
  }
}

async function fetchBlogById(id: number): Promise<Blog> {
  try {
    const response = await fetch(`${API_BASE}/blogs/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch blog");
    }
    return response.json();
  } catch {
    // Return mock blog when API is unavailable
    const mockBlog = MOCK_BLOGS.find(b => b.id === id);
    if (mockBlog) return mockBlog;
    throw new Error("Blog not found");
  }
}

async function createBlog(input: CreateBlogInput): Promise<Blog> {
  const response = await fetch(`${API_BASE}/blogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...input,
      date: new Date().toISOString(),
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to create blog");
  }
  return response.json();
}

export function useBlogs() {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });
}

export function useBlog(id: number | null) {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchBlogById(id!),
    enabled: id !== null,
  });
}

export function useCreateBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
}
