package com.example.qrmata.Activities;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

import com.example.qrmata.R;
import com.google.android.material.button.MaterialButton;

public class LocationActivity extends AppCompatActivity implements View.OnClickListener {

    private MaterialButton _btnEncender;
    private MaterialButton _btnApagar;
    private TextView _status;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_location);
    }

    public void initializeComponents(){
        _btnEncender = findViewById(R.id.btnEncender);
        _btnApagar = findViewById(R.id.btnApagar);
        _status = findViewById(R.id.statuslocation);
        findViewById(R.id.btnEncender).setOnClickListener(this);
        findViewById(R.id.btnApagar).setOnClickListener(this);
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.btnEncender:
                _status.setText("La Ubicacion esta encendida");
                break;
            case R.id.btnApagar:
                _status.setText("La Ubicacion esta apagada");
                break;
        }
    }
}
