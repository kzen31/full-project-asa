package com.asaproject.asalife.domains.models.responses;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BobotDto {
    private long id;
    private String pilihan;
    private Integer nilai;
}
