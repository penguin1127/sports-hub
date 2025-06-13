package com.example.backend.enums;

// 축구 포지션
public enum Position {

    GK("골키퍼"),
    DF("수비수"),
    MF("미드필더"),
    FW("공격수");

    private final String label;

    Position(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}
