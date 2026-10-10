package com.eventsphere.dto;

public class WhatsAppMessageDTO {
    private String recipientPhone;
    private String rawText;
    private String encodedText;
    private String clickToChatUrl;
    private String destinationType;
    private String disclaimer;

    public WhatsAppMessageDTO() {}

    public WhatsAppMessageDTO(String recipientPhone, String rawText, String encodedText, String clickToChatUrl, String destinationType, String disclaimer) {
        this.recipientPhone = recipientPhone;
        this.rawText = rawText;
        this.encodedText = encodedText;
        this.clickToChatUrl = clickToChatUrl;
        this.destinationType = destinationType;
        this.disclaimer = disclaimer;
    }

    public static WhatsAppMessageDTOBuilder builder() {
        return new WhatsAppMessageDTOBuilder();
    }

    public String getRecipientPhone() { return recipientPhone; }
    public void setRecipientPhone(String recipientPhone) { this.recipientPhone = recipientPhone; }

    public String getRawText() { return rawText; }
    public void setRawText(String rawText) { this.rawText = rawText; }

    public String getEncodedText() { return encodedText; }
    public void setEncodedText(String encodedText) { this.encodedText = encodedText; }

    public String getClickToChatUrl() { return clickToChatUrl; }
    public void setClickToChatUrl(String clickToChatUrl) { this.clickToChatUrl = clickToChatUrl; }

    public String getDestinationType() { return destinationType; }
    public void setDestinationType(String destinationType) { this.destinationType = destinationType; }

    public String getDisclaimer() { return disclaimer; }
    public void setDisclaimer(String disclaimer) { this.disclaimer = disclaimer; }

    public static class WhatsAppMessageDTOBuilder {
        private String recipientPhone;
        private String rawText;
        private String encodedText;
        private String clickToChatUrl;
        private String destinationType;
        private String disclaimer;

        public WhatsAppMessageDTOBuilder recipientPhone(String recipientPhone) { this.recipientPhone = recipientPhone; return this; }
        public WhatsAppMessageDTOBuilder rawText(String rawText) { this.rawText = rawText; return this; }
        public WhatsAppMessageDTOBuilder encodedText(String encodedText) { this.encodedText = encodedText; return this; }
        public WhatsAppMessageDTOBuilder clickToChatUrl(String clickToChatUrl) { this.clickToChatUrl = clickToChatUrl; return this; }
        public WhatsAppMessageDTOBuilder destinationType(String destinationType) { this.destinationType = destinationType; return this; }
        public WhatsAppMessageDTOBuilder disclaimer(String disclaimer) { this.disclaimer = disclaimer; return this; }

        public WhatsAppMessageDTO build() {
            return new WhatsAppMessageDTO(recipientPhone, rawText, encodedText, clickToChatUrl, destinationType, disclaimer);
        }
    }
}
