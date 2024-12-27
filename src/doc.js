import React from "react";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  wordList: {
    marginTop: 10,
  },
  word: {
    fontSize: 12,
    marginBottom: 5,
  },
});

export const WordListPdf = ({ title, words }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.wordList}>
        {words.map((word, index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <Text style={styles.word}>
              {index + 1}. {word}
            </Text>
            <Text style={styles.word}>Meaning:</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

/**
 * Gera um link para download do PDF.
 * @param {string} title - Título do PDF.
 * @param {string[]} words - Lista de palavras pesquisadas.
 * @returns {React.Element} Componente de download.
 */
export const DownloadPdfButton = ({ title, words }) => (
  <PDFDownloadLink
    document={<WordListPdf title={title} words={words} />}
    fileName="searched_words.pdf"
    style={{
      textDecoration: "none",
      textAlign:"center",
      padding: "10px 20px",
      color: "#fff",
      backgroundColor: "#ff6969",
      borderRadius: "5px",
      display: "grid",
      fontStyle:"weight"
    }}
  >
    {({ loading }) => (loading ? "Gerando PDF..." : "PDF")}
  </PDFDownloadLink>
);
