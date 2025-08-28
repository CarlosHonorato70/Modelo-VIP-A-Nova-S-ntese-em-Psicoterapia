from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from reportlab.lib.units import inch
from reportlab.lib.pagesizes import letter
from reportlab.lib.colors import black
from reportlab.pdfgen import canvas
import re

def generate_pdf_reportlab(md_path, pdf_path):
    doc = SimpleDocTemplate(pdf_path, pagesize=letter,
                            rightMargin=inch,
                            leftMargin=inch,
                            topMargin=inch,
                            bottomMargin=inch)
    styles = getSampleStyleSheet()
    story = []

    # Custom styles with unique names
    styles.add(ParagraphStyle(name="CustomTitleStyle", fontName="Helvetica-Bold", fontSize=24, alignment=TA_CENTER, spaceAfter=24))
    styles.add(ParagraphStyle(name="CustomSubtitleStyle", fontName="Helvetica", fontSize=14, alignment=TA_CENTER, spaceAfter=12))
    styles.add(ParagraphStyle(name="CustomHeading1", fontName="Helvetica-Bold", fontSize=18, spaceBefore=24, spaceAfter=12))
    styles.add(ParagraphStyle(name="CustomHeading2", fontName="Helvetica-Bold", fontSize=14, spaceBefore=18, spaceAfter=9))
    styles.add(ParagraphStyle(name="CustomHeading3", fontName="Helvetica-Bold", fontSize=12, spaceBefore=12, spaceAfter=6))
    styles.add(ParagraphStyle(name="CustomNormal", fontName="Helvetica", fontSize=10, leading=12, spaceAfter=6))
    styles.add(ParagraphStyle(name="CustomTOCEntry", fontName="Helvetica", fontSize=10, leading=12, leftIndent=0.2*inch))
    styles.add(ParagraphStyle(name="CustomTOCSubEntry", fontName="Helvetica", fontSize=10, leading=12, leftIndent=0.4*inch))

    # Read Markdown content
    with open(md_path, "r", encoding="utf-8") as f:
        md_content = f.read()

    # Extract TOC and content
    toc_pattern = r"## Sumário\n(.*?)\n\n# "
    toc_match = re.search(toc_pattern, md_content, re.DOTALL)
    
    toc_raw_entries = []
    if toc_match:
        toc_section = toc_match.group(1)
        toc_lines = toc_section.split("\n")
        for line in toc_lines:
            if line.strip():
                toc_raw_entries.append(line.strip())
        md_content = re.sub(toc_pattern, "", md_content, 1) # Remove TOC section from main content

    # Add Title and Subtitle
    story.append(Paragraph("MODELO VIP - A NOVA SÍNTESE EM PSICOTERAPIA", styles["CustomTitleStyle"]))
    story.append(Paragraph("Vínculo, Imagem e Palavra à Luz da Teoria da Emoção Construída", styles["CustomSubtitleStyle"]))
    story.append(PageBreak())

    # Generate TOC
    story.append(Paragraph("Sumário", styles["CustomHeading1"]))
    story.append(Spacer(1, 0.2 * inch))

    # Placeholder for TOC page numbers
    toc_entries_with_pages = []
    for entry in toc_raw_entries:
        # Extract title and slug from Markdown TOC entry
        match = re.match(r"^- \[(.*?)\]\(#(.*?)\)", entry)
        if match:
            title = match.group(1)
            slug = match.group(2)
            toc_entries_with_pages.append({"title": title, "slug": slug, "level": 0})
        else:
            match = re.match(r"^  - \[(.*?)\]\(#(.*?)\)", entry)
            if match:
                title = match.group(1)
                slug = match.group(2)
                toc_entries_with_pages.append({"title": title, "slug": slug, "level": 1})
            else:
                match = re.match(r"^    - \[(.*?)\]\(#(.*?)\)", entry)
                if match:
                    title = match.group(1)
                    slug = match.group(2)
                    toc_entries_with_pages.append({"title": title, "slug": slug, "level": 2})

    # Store page numbers for TOC
    page_number_map = {}

    # Process content and collect page numbers
    current_page = 1 # Start page number for content
    content_story = []

    # Split content by headings to assign page numbers
    # This is a simplified approach; a more robust solution would parse Markdown more deeply
    sections = re.split(r"(#+ .*?)\n", md_content)
    for i, section in enumerate(sections):
        if not section.strip():
            continue

        if section.startswith("#"): # It's a heading
            heading_level = section.count("#")
            heading_text = section.replace("#", "").strip()
            slug = generate_slug(heading_text)
            
            # Add page break before major sections
            if heading_level == 1 and i > 0: # Don't add page break before the very first section
                content_story.append(PageBreak())
                current_page += 1

            page_number_map[slug] = current_page

            if heading_level == 1:
                content_story.append(Paragraph(heading_text, styles["CustomHeading1"]))
            elif heading_level == 2:
                content_story.append(Paragraph(heading_text, styles["CustomHeading2"]))
            elif heading_level == 3:
                content_story.append(Paragraph(heading_text, styles["CustomHeading3"]))
        else:
            # Regular paragraph
            for para_text in section.split("\n\n"):
                if para_text.strip():
                    content_story.append(Paragraph(para_text.strip(), styles["CustomNormal"]))

    # Fill TOC with actual page numbers
    for entry in toc_entries_with_pages:
        page_num = page_number_map.get(entry["slug"], "?") # Get page number from map
        if entry["level"] == 0:
            story.append(Paragraph(f"{entry['title']} <seq id=\"{entry['slug']}\"/> <font color=\"gray\"> (p. {page_num})</font>", styles["CustomTOCEntry"]))
        elif entry["level"] == 1:
            story.append(Paragraph(f"{entry['title']} <seq id=\"{entry['slug']}\"/> <font color=\"gray\"> (p. {page_num})</font>", styles["CustomTOCSubEntry"]))
        elif entry["level"] == 2:
            story.append(Paragraph(f"{entry['title']} <seq id=\"{entry['slug']}\"/> <font color=\"gray\"> (p. {page_num})</font>", styles["CustomTOCSubEntry"])) # Using same style for now

    story.append(PageBreak())
    story.extend(content_story)

    # Function to add page numbers to each page
    def footer(canvas_obj, doc_obj):
        canvas_obj.saveState()
        canvas_obj.setFont("Helvetica", 9)
        canvas_obj.drawString(letter[0]/2.0, 0.75 * inch, str(doc_obj.page))
        canvas_obj.restoreState()

    doc.build(story, onFirstPage=footer, onLaterPages=footer)
    print(f"PDF gerado com sucesso: {pdf_path}")

def generate_slug(text):
    text = text.lower()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    text = text.strip("-")
    return text

if __name__ == "__main__":
    generate_pdf_reportlab("/home/ubuntu/LivroModeloVIP_final.md", "/home/ubuntu/LivroModeloVIP_final_numbered_formatted.pdf")

